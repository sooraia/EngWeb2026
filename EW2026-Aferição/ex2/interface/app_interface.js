const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Configurações do Express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

// URL da API (Se estiveres a correr fora do Docker, usa localhost)
const API_URL = process.env.API_URL || "http://localhost:16025/repairs";

app.get('/', (req, res) => {
  const d = new Date().toISOString().substring(0, 16);

  axios.get(API_URL + '?_select=_id,data,nome,viatura,intervencoes')
    .then(response => {
      res.render('index', {
        reparacoes: response.data,
        date: d
      });
    })
    .catch(err => {
      res.render('error', {
        error: err,
        message: "Erro ao obter dados da API"
      });
    });
});

app.get('/:id', (req, res) => {
  const d = new Date().toISOString().substring(0, 16);
  const id = req.params.id;

  axios.get(`${API_URL}/${encodeURIComponent(id)}`)
    .then(response => {
      res.render('repair', {
        reparacao: response.data,
        date: d
      });
    })
    .catch(err => {
      res.render('error', {
        error: err,
        message: `Erro ao obter o registo ${id}`
      });
    });
});

app.get('/marcas/:marca', (req, res) => {
  const d = new Date().toISOString().substring(0, 16);
  const marca = req.params.marca;
    axios.get(`${API_URL}?viatura.marca=${encodeURIComponent(marca)}&_select=_id,data,nome,viatura,intervencoes`)
    .then(response => {
      res.render('marca', {
        marca: marca,
        modelos: response.data.map(r => r.viatura.modelo)
                                .filter((modelo, idx, arr) => arr.indexOf(modelo) === idx),
        reparacoes: response.data,
        date: d
      });
    })
    .catch(err => {
      res.render('error', {
        error: err,
        message: `Erro ao obter os registos da marca ${marca}`
      });
    });
});

const PORT = 16026;
app.listen(PORT, () => {
    console.log(`Servidor de Interface em http://localhost:${PORT}`);
});