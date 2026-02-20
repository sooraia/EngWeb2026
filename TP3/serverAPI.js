
const http = require("http")
const util = require('./utils.js')
const axios = require('axios')
const { parse } = require("path")


async function getAlunos(){
    const resp = await axios.get("http://localhost:3000/alunos")
    return resp.data
}

async function getCursos(){
    const resp = await axios.get("http://localhost:3000/cursos")
    return resp.data
}

async function getInstrumentos(){
    const resp = await axios.get("http://localhost:3000/instrumentos")
    return resp.data
}

var myServer = http.createServer(async function (req,res) {
    console.log(req.method + " " + req.url + "")
    switch(req.method) {
        case "GET":
            if(req.url == "/") {
                try {
                    var corpo = util.card('Índice', util.lista( [util.link("/alunos ", "Alunos"), util.link("/cursos", "Cursos"), util.link('/instrumentos', "Instrumentos")] ))
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'})
                    res.end(util.pagina("Escola de Música", corpo))
                } catch(error) {
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8'})
                    res.end(`<p>Erro no servidor de dados: ${error}</p>`)
                }

            } else if (req.url.startsWith('/alunos'))  {
                try {
                    alunos = await getAlunos()
                    var headers = ["ID", "Nome", "Data de Nascimento", "Curso", "Ano do Curso", "Instrumento"]
                    alunos.sort((a,b) => String(a.id).localeCompare(String(b.id), 'pt', { numeric: true, sensitivity: 'base' }))
                    var linhas = alunos.map(a => [a.id, a.nome, a.dataNasc, a.curso, a.anoCurso, a.instrumento])
                    var tabela = util.table(headers, linhas)
                    var corpo = util.card('Lista de Alunos', tabela + util.botaoVoltar())
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'})
                    res.end(util.pagina("Alunos", corpo))
                } catch(error) {
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8'})
                    res.end(`<p>Erro no servidor de dados: ${error}</p>`)
                }
            } else if (req.url.startsWith('/cursos'))  {
                try {
                    cursos = await getCursos()
                    cursos.sort((a,b) => String(a.id).localeCompare(String(b.id), 'pt', { numeric: true, sensitivity: 'base' }))
                    var headers = ["ID", "Designação", "Duração", "Instrumento"]
                    var linhas = cursos.map(c => [c.id, c.designacao, c.duracao, c.instrumento['#text']])
                    var tabela = util.table(headers, linhas)
                    var corpo = util.card('Lista de Cursos', tabela + util.botaoVoltar())
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'})
                    res.end(util.pagina("Cursos", corpo))
                } catch(error) {
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8'})
                    res.end(`<p>Erro no servidor de dados: ${error}</p>`)
                }
            } else if (req.url.startsWith('/instrumentos'))  {
                try {
                    instrumentos = await getInstrumentos()
                    instrumentos.sort((a,b) => String(a.id).localeCompare(String(b.id), 'pt', { numeric: true, sensitivity: 'base' }))
                    var headers = ["ID", "Nome"]
                    var linhas = instrumentos.map(i => [i.id, i['#text']])
                    var tabela = util.table(headers, linhas)
                    var corpo = util.card('Lista de Instrumentos', tabela + util.botaoVoltar())
                    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'})
                    res.end(util.pagina("Instrumentos", corpo))
                } catch(error) {
                    res.writeHead(500, { 'Content-Type': 'text/html; charset=utf-8'})
                    res.end(`<p>Erro no servidor de dados: ${error}</p>`)
                }
            } else {
                res.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8'})
                res.end(`<p>Rota não suportada: ${req.url}.</p>`)
            }
            break;
        default:
            res.writeHead(405, { 'Content-Type': 'text/html; charset=utf-8'})
            res.end(`<p>Método não suportado: ${req.method}.</p>`)
            break;
    }
})

myServer.listen(7777)
console.log("Servidor à escuta na porta 7777")