
var http = require('http')
var axios = require('axios')
const { parse } = require('querystring');

var templates = require('./templates.js')           // Necessario criar e colocar na mesma pasta
var static = require('./static.js')                 // Colocar na mesma pasta

// Aux functions and variables
function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
            console.log("Chunk recebido: " + chunk.toString())
        });
        request.on('end', () => {
            obj = parse(body)
            obj["resultado"] = obj["resultado"] === "on" ? true : false
            obj["federado"] = obj["federado"] === "on" ? true : false
            callback(obj);
        });
    }
    else {
        callback(null);
    }
}
var sort_data = true

// Server creation
var emdServer = http.createServer((req, res) => {
    // Logger: what was requested and when it was requested
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Handling request
    if(static.staticResource(req)){
        static.serveStaticResource(req, res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /emd ------------------------------------------------------------------
                if((req.url == '/') || req.url == '/emd'){
                    var url = "http://localhost:3000/emd?_sort="
                    if(sort_data)
                        url += "dataEMD"
                    else url += "primeiro_nome"
                    axios.get(url)
                    .then(resp => {
                        var emd = resp.data
                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                        res.write(templates.emdListPage(emd, d, sort_data))
                        res.end()
                    })
                    .catch(erro => {
                        res.writeHead(501, {'Content-Type' : 'text/html;charset=utf-8'})
                        res.write('<p>Não foi possível obter os emds</p>')
                        res.write('<p>' + erro + '</p>')
                        res.end()
                    })
                }
                // GET /emd?sort=nome ---------------------------------------------------------
                else if(req.url == '/emd?sort=nome'){
                    sort_data = false
                    res.writeHead(303, { Location: '/' }) // ou 302
                    res.end()
                }
                // GET /emd?sort=data ---------------------------------------------------------
                else if(req.url == '/emd?sort=data'){
                    sort_data = true
                    res.writeHead(303, { Location: '/' }) // ou 302
                    res.end()
                }

                // GET /emd/registo ---------------------------------------------------------
                else if(req.url == '/emd/registo'){
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write(templates.emdFormPage(null, d))
                    res.end()
                }
                // GET /emd/editar/:id ---------------------------------------------------------
                else if(/\/emd\/editar\/[0-9a-zA-Z_-]+$/i.test(req.url)){
                    var id = req.url.split("/")[3]
                                    
                    axios.get("http://localhost:3000/emd?id=" + id)
                    .then(resp => {
                        var emd = resp.data[0]
                        if(!emd){
                            res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.write('<p>Registo inexistente: ' + id + '</p>')
                            res.end('<p><a href="/">Voltar atrás</a></p>')
                            return
                        }

                        res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                        res.write(templates.emdFormPage(emd, d))
                        res.end()
                    })
                    .catch(erro => {
                        console.log(erro)
                        res.writeHead(501, {'Content-Type' : 'text/html;charset=utf-8'})
                        res.write('<p>Não foi possível obter o registo do emd</p>')
                        res.write('<p>' + erro + '</p>')
                        res.end()
                    })
                }
                // GET /emd/apagar/:id -------------------------------------------------------
                else if(/\/emd\/apagar\/[0-9a-zA-Z_-]+$/i.test(req.url)){
                    var id = req.url.split('/')[3]
                    axios.delete("http://localhost:3000/emd/" + id)
                        .then(resp => {
                            res.writeHead(303, { Location: '/' }) // ou 302
                            res.end()
                        })
                        .catch(erro => {
                            console.log(erro)
                            res.writeHead(501, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.write('<p>Não foi possível eliminar o registo do emd</p>')
                            res.write('<p>' + erro + '</p>')
                            res.end()
                        })
                }

                // GET /emd/stats -------------------------------------------------------
                else if(req.url == '/emd/stats'){
                    axios.get("http://localhost:3000/emd")
                        .then(resp => {
                            var emd = resp.data
                            var stats = {}
                            var registos = ["género", "modalidade", "clube", "federado", "resultado"]
                            for (e of emd){
                                for (var r of registos) {
                                    if (!e[r] && typeof e[r] != "boolean") e[r] = "Indefinido"
                                    if (r=="género"){
                                        if (e[r]=="M") e[r] = "Masculino"
                                        else if(e[r]=="F") e[r] = "Feminino"
                                        else e[r] = "Outro"
                                    }
                                    if (typeof e[r] == "boolean"){
                                        if (e[r]) e[r] = "Sim"
                                        else e[r] = "Não"
                                    }
                                    if(stats[r]){
                                        if(stats[r][e[r]]){
                                            stats[r][e[r]] += 1
                                        }else{
                                            stats[r][e[r]] = 1
                                        }
                                    }else{
                                        stats[r] = {}
                                        stats[r][e[r]] = 1
                                    }
                                }
                            }
                            console.log(stats)
                            res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.write(templates.emdStatsPage(stats, d))
                            res.end()
                        })
                        .catch(erro => {
                            console.log(erro)
                            res.writeHead(501, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.write('<p>Não foi possível obter os emds</p>')
                            res.write('<p>' + erro + '</p>')
                            res.end()
                        })
                }
                
                // GET /emd/:id --------------------------------------------------------------
                else if(/\/emd\/[0-9a-zA-Z_-]+$/i.test(req.url)){
                    var id = req.url.split('/')[2]
                    axios.get("http://localhost:3000/emd?id=" + id)
                        .then(resp => {
                            var emd = resp.data[0]
                            if(!emd){
                                res.writeHead(404, {'Content-Type' : 'text/html;charset=utf-8'})
                                res.write('<p>Registo inexistente: ' + id + '</p>')
                                res.end('<p><a href="/">Voltar atrás</a></p>')
                                return
                            }

                            var pagHTML = templates.emdIndividualPage(emd, d)
                            res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.end(pagHTML)
                        })
                        .catch(erro => {
                            console.log(erro)
                            if(!res.headersSent){
                                res.writeHead(501, {'Content-Type' : 'text/html;charset=utf-8'})
                                res.write('<p>Não foi possível obter o emd</p>')
                                res.write('<p>' + erro + '</p>')
                                res.end()
                            }
                        })
                }
                
                else{
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write('<p>Recurso inexistente: ' + req.url + '</p>')
                    res.write('<p><a href="/">Voltar atrás</a></p>')
                    res.end()
                }
                break;
            case "POST":
                // POST /emd --------------------------------------------------------------------
                if(req.url == '/emd'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post("http://localhost:3000/emd", result)
                            .then(resp => {
                                console.log(resp.data)
                                res.writeHead(201, {'Content-Type' : 'text/html;charset=utf-8'})
                                res.write('<p>Registo inserido: ' + JSON.stringify(resp.data) + '</p>')
                                res.end('<address><a href="/">Voltar</a></address>')
                            })
                            .catch(erro => {
                                res.writeHead(503, {'Content-Type' : 'text/html;charset=utf-8'})
                                res.write('<p>Não foi possível inserir o registo</p>')
                                res.write('<p>' + erro + '</p>')
                                res.end('<address><a href="/">Voltar</a></address>')
                            })
                        }else{
                            res.writeHead(502, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.write('<p>Não foi possível obter os dados do body</p>')
                            res.end()
                        }
                    })
                }
                // POST /emd/:id --------------------------------------------------------------
                else if(/\/emd\/[0-9a-zA-Z_-]+$/i.test(req.url)){
                    collectRequestBodyData(req, result => {
                        console.log("Antes:" + JSON.stringify(result))
                        if(result){
                            axios.put("http://localhost:3000/emd/" + result.id, result)
                            .then(resp => {
                                console.log(resp.data)
                                res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                                res.write('<p>Registo alterado: ' + JSON.stringify(resp.data) + '</p>')
                                res.end('<address><a href="/">Voltar</a></address>')
                            })
                            .catch(erro => {
                                res.writeHead(507, {'Content-Type' : 'text/html;charset=utf-8'})
                                res.write('<p>Não foi possível atualizar o registo</p>')
                                res.write('<p>' + erro + '</p>')
                                res.end()
                            })
                        }else{
                            res.writeHead(506, {'Content-Type' : 'text/html;charset=utf-8'})
                            res.write('<p>Não foi possível obter os dados do body</p>')
                            res.end()
                        }
                    })
                }
                else{
                    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                    res.write('<p>Método POST não suportado: ' + req.url + '</p>')
                    res.write('<p><a href="/">Voltar atrás</a></p>')
                    res.end()
                }
                break;
            default: 
                // Outros metodos nao sao suportados
                res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
                res.write('<p>Método não suportado: ' + req.method + '</p>')
                res.end()
                break;
        }
    }
})

emdServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



