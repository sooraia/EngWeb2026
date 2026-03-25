const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// O meu logger
app.use(function(req, res, next){
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)
    next()
})

// 1. Conexão ao MongoDB
const nomeBD = "autoRepair"
const mongoHost = process.env.MONGO_URL || `mongodb://127.0.0.1:27017/${nomeBD}`
mongoose.connect(mongoHost)
    .then(() => console.log(`MongoDB: liguei-me à base de dados ${nomeBD}.`))
    .catch(err => console.error('Erro:', err));

// 2. Esquema flexível (strict: false permite campos variados do dataset jcrcinema.json)
//      - Mas assume alguns pressupostos... como o tipo do _id
//      - versionKey: false, faz com que o atributo _v não seja adicionado ao documento
const repairSchema = new mongoose.Schema({ _id: String }, {  strict: false, versionKey: false });
const repairs = mongoose.model('repairs', repairSchema, 'repairs');

// GET /repairs: devolve uma lista com todos os registos dos automóveis reparados;
app.get('/repairs', async (req, res) => {
    try {
        let queryObj = { ...req.query };
        
        // 1. Extração de parâmetros especiais
        const searchTerm = queryObj.q;
        const fields = queryObj._select; // Ex: "title,authors,year"
        const sortField = queryObj._sort;
        const order = queryObj._order === 'desc' ? -1 : 1;

        // Limpeza do objeto de query para não filtrar por parâmetros de controlo
        delete queryObj.q;
        delete queryObj._select;
        delete queryObj._sort;
        delete queryObj._order;

        let mongoQuery = {};
        let projection = {};
        let mongoSort = {};

        if (queryObj.marca && !queryObj["viatura.marca"]) {
            queryObj["viatura.marca"] = queryObj.marca;
        }
        delete queryObj.marca;

        const yearParam = queryObj.ano || queryObj.year;
        if (yearParam && !queryObj.data) {
            const y = String(yearParam).trim();
            if (!/^\d{4}$/.test(y)) {
                return res.status(400).json({ error: "Parâmetro 'ano' inválido. Use YYYY." });
            }
            queryObj.data = { $regex: "^" + y + "-" };
        }

        // importante: remover os atalhos para não irem para o filtro final
        delete queryObj.ano;
        delete queryObj.year;

        // 2. Configuração da Pesquisa de Texto
        if (searchTerm) {
            mongoQuery = { $text: { $search: searchTerm } };
            // Score de relevância
            projection.score = { $meta: "textScore" };
            mongoSort = { score: { $meta: "textScore" } };
        } else {
            mongoQuery = queryObj;
        }

        // 3. Configuração da Projeção (_select)
        if (fields) {
            // Converte "title,year" em { title: 1, year: 1 }
            fields.split(',').forEach(f => {
                projection[f.trim()] = 1;
            });
        }

        // 4. Execução da Query
        let execQuery = repairs.find(mongoQuery, projection);

        // Prioridade de ordenação: _sort manual ou textScore se houver pesquisa
        if (sortField) {
            execQuery = execQuery.sort({ [sortField]: order });
        } else if (searchTerm) {
            execQuery = execQuery.sort(mongoSort);
        }

        const repairsList = await execQuery.exec();
        res.json(repairsList);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// GET /repairs/matrículas: devolve a lista de matrículas (sem repetições e ordenada
// alfabeticamente);
app.get('/repairs/matriculas', async (req, res) => {
    try {
        const matriculas = await repairs.distinct("viatura.matricula");
        matriculas.sort();
        res.json(matriculas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /repairs/interv: devolve a lista de intervenções realizadas (lista de triplos sem repetições e
// ordenada por código: código, nome e descrição);
app.get('/repairs/interv', async (req, res) => {
    try {
        const intervencoes = await repairs.aggregate([
            { $unwind: "$intervencoes" },
            { $group: { _id: "$intervencoes.codigo", nome: { $first: "$intervencoes.nome" }, descricao: { $first: "$intervencoes.descricao" } } },
            { $sort: { _id: 1 } }
        ]);
        res.json(intervencoes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /repairs/:id: devolve o registo com identificador id
app.get('/repairs/:id', async (req, res) => {
    try {
        const repair = await repairs.findById(req.params.id);
        if (!repair) return res.status(404).json({ error: "Não encontrado" });
        res.json(repair);
    } catch (err) {
        res.status(400).json({ error: "ID inválido ou erro de sistema" });
    }
});

// POST /repairs: acrescenta um registo novo à BD;
app.post('/repairs', async (req, res) => {
    try {
        const newRepair = new repairs(req.body);
        const saved = await newRepair.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// DELETE /repairs/:id: elimina da BD o registo com o identificador id
app.delete('/repairs/:id', async (req, res) => {
    try {
        const deleted = await repairs.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ error: "Não encontrado" });
        res.json({ message: "Registo eliminado", id: req.params.id });
    } catch (err) {
        res.status(400).json({ error: "ID inválido ou erro de sistema" });
    }
});

app.listen(16025, () => console.log('API minimalista em http://localhost:16025/repairs'));