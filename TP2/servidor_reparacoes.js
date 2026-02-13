const axios = require('axios');
const http = require('http');

http.createServer(function (req, res) {
    if(req.url == "/reparacoes") {
        // tabela reparações
        axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                html = 
                `<html>
                    <head>
                        <title>Reparações</title>
                        <meta charset="utf-8"/>
                    </head>
                    <body>
                        <h2>Reparações</h2>
                        <table border="1">
                            <tr><th>Nome</th><th>NIF</th><th>Data</th><th>Marca</th><th>Modelo</th><th>Matrícula</th><th>Número de Intervenções</th></tr>`
                dados = resp.data;
                Array.from(dados).sort((a,b) => a.nome.localeCompare(b.nome)).forEach(a => {
                    html+= `<tr>
                        <td>${a.nome}</td><td>${a.nif}</td><td>${a.data}</td><td>${a.viatura.marca}</td><td>${a.viatura.modelo}</td><td>${a.viatura.matricula}</td><td>${a.nr_intervencoes}</td>
                    </tr>`
                })
                html+= `
                        </table>
                    </body>
                </html>`
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(html);
            })
            .catch(error => {
                console.log(error);
                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<pre>" + JSON.stringify(error) + "<pre>")
            });
    }


    else if(req.url == "/intervencoes") {
        // tabela intervenções
        axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                html = 
                `<html>
                    <head>
                        <title>Intervenções</title>
                        <meta charset="utf-8"/>
                    </head>
                    <body>
                        <h2>Intervenções</h2>
                        <table border="1">
                            <tr><th>Código</th><th>Nome</th><th>Descrição</th><th>Número de Reparações</th></tr>`
                dados = resp.data;

                let intervencoes = new Map();
                Array.from(dados).forEach(a => {
                    a.intervencoes.forEach(i => {
                        if(intervencoes.has(i.codigo)) {
                            let nr_reparacoes = intervencoes.get(i.codigo).nr_reparacoes + 1;
                            intervencoes.set(i.codigo, {nome: i.nome, descricao: i.descricao, nr_reparacoes: nr_reparacoes})
                        }
                        else {
                            intervencoes.set(i.codigo, {nome: i.nome, descricao: i.descricao, nr_reparacoes: 1})
                        }
                    })
                })
                Array.from(intervencoes).sort((a,b) => a[0].localeCompare(b[0])).forEach(i => {
                    html+= `<tr>
                        <td>${i[0]}</td><td>${i[1].nome}</td><td>${i[1].descricao}</td><td>${i[1].nr_reparacoes}</td>
                    </tr>`
                })
                html+= `
                        </table>
                    </body>
                </html>`
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(html);
            })
            .catch(error => {
                console.log(error);
                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<pre>" + JSON.stringify(error) + "<pre>")
            });
    }

    else if(req.url == "/viaturas") {
        // tabela viaturas
        axios.get('http://localhost:3000/reparacoes')
            .then(resp => {
                html = 
                `<html>
                    <head>
                        <title>Viaturas</title>
                        <meta charset="utf-8"/>
                    </head>
                    <body>
                        <h2>Viaturas</h2>
                        <table border="1">
                            <tr><th>Marca</th><th>Modelo</th><th>Número de Reparações</th></tr>`
                dados = resp.data;

                let viaturas = new Map();
                Array.from(dados).forEach(a => {
                    let marca = a.viatura.marca;
                    let modelo = a.viatura.modelo;
                    let key = { marca: marca, modelo: modelo }
                    if(viaturas.has(key)) {
                        let nr_reparacoes = viaturas.get(key) + 1;
                        viaturas.set(key, nr_reparacoes)
                    }
                    else {
                        viaturas.set(key, 1)
                    }
                })
                Array.from(viaturas).sort((a,b) => a[0].marca.localeCompare(b[0].marca) || a[0].modelo.localeCompare(b[0].modelo)).forEach(v => {
                    html+= `<tr>
                        <td>${v[0].marca}</td><td>${v[0].modelo}</td><td>${v[1]}</td>
                    </tr>`
                })
                html+= `
                        </table>
                    </body>
                </html>`
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.end(html);
            })
            .catch(error => {
                console.log(error);
                res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
                res.end("<pre>" + JSON.stringify(error) + "<pre>")
            });
    }


    else {
        res.writeHead(520, {'Content-Type': 'text/html; charset=utf-8'})
        res.end("<p>Pedido não suportado. Tente novamente.</p>")
    }
}).listen(7777);

console.log("Servidor à escuta na porta 7777");