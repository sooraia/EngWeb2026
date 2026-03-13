const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Configurações do Express
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static('public'));

// URL da API (Se estiveres a correr fora do Docker, usa localhost)
const API_URL = process.env.API_URL || "http://localhost:7789";


/* GET / ou /filmes */
app.get(['/', '/filmes'], function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var sort_data = "title"
  if (req.query.sort) {
    sort_data = req.query.sort
  }
  axios.get(API_URL + '/filmes?_sort=' + sort_data)
    .then(resp => {
        var filmes = resp.data
        console.log(Array.isArray(filmes))
        res.render('index', { list: filmes, date: d, sort_data: sort_data });
    })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados da API" 
            });
        });
});


module.exports = app;

/* GET /filmes/:id */
app.get('/filmes/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var id = req.params.id
  axios.get(API_URL + '/filmes/' + id)
    .then(resp => {
        var filme = resp.data
        res.render('film', { filme: filme, date: d });
    })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados da API" 
            });
        });
});

/* GET /atores */
app.get('/atores', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get(API_URL + "/atores?_sort=actor")
    .then(resp => {
        var cast = resp.data
        res.render('actors', { list: cast, date: d });
    })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados da API" 
            });
        });
});

/* GET /atores/:id */
app.get('/atores/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var id = req.params.id
  axios.get(API_URL + "/atores/" + id)
    .then(resp => {
        var ator = resp.data
        res.render('actor', { ator: ator, date: d });
    })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados da API" 
            });
        });
});

/* GET /generos */
app.get('/generos', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get(API_URL + "/generos?_sort=genre")
    .then(resp => {
        var filmes = resp.data
        res.render('genres', { list: filmes, date: d });
    })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados da API" 
            });
        });
});

/* GET /generos/:id */
app.get('/generos/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var id = req.params.id
  axios.get(API_URL + "/generos/" + id)
    .then(resp => {
        var genre = resp.data
        res.render('genre', { genre: genre, date: d });
    })
        .catch(err => {
            res.render('error', { 
                error: err, 
                message: "Erro ao obter dados da API" 
            });
        });
});


// app.get('/emds', (req, res) => {
//     const d = new Date().toISOString().substring(0, 16);
    
//     // Faz o pedido à API de dados
//     axios.get(API_URL + '?_select=_id,dataEMD,nome,modalidade')
//         .then(response => {
//             res.render('index', { 
//                 emds: response.data, 
//                 date: d 
//             });
//         })
//         .catch(err => {
//             res.render('error', { 
//                 error: err, 
//                 message: "Erro ao obter dados da API" 
//             });
//         });
// });

const PORT = 7790;
app.listen(PORT, () => {
    console.log(`Servidor de Interface em http://localhost:${PORT}/filmes`);
});