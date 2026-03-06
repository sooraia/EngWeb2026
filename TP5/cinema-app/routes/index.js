var express = require('express');
var router = express.Router();
var axios = require('axios')

/* GET / ou /filmes */
router.get(['/', '/filmes'], function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  var sort_data = "title"
  if (req.query.sort) {
    sort_data = req.query.sort
  }
  axios.get("http://localhost:3000/filmes?_sort=" + sort_data)
    .then(resp => {
        var filmes = resp.data
        console.log(Array.isArray(filmes))
        res.render('index', { list: filmes, date: d, sort_data: sort_data });
    })
  .catch(err => next(err))
});


module.exports = router;

/* GET /filmes/:id */
router.get('/filmes/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/filmes/" + req.params.id)
    .then(resp => {
        var filme = resp.data
        res.render('film', { filme: filme, date: d });
    })
  .catch(err => next(err))
});

/* GET /atores */
router.get('/atores', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/cast?_sort=actor")
    .then(resp => {
        var cast = resp.data
        res.render('actors', { list: cast, date: d });
    })
  .catch(err => next(err))
});

/* GET /atores/:id */
router.get('/atores/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/cast?actor=" + decodeURIComponent(req.params.id))
    .then(resp => {
        var ator = resp.data[0]
        res.render('actor', { ator: ator, date: d });
    })
  .catch(err => next(err))
});

/* GET /generos */
router.get('/generos', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/genres?_sort=genre")
    .then(resp => {
        var filmes = resp.data
        res.render('genres', { list: filmes, date: d });
    })
  .catch(err => next(err))
});

/* GET /generos/:id */
router.get('/generos/:id', function(req, res, next) {
  var d = new Date().toISOString().substring(0, 16)
  axios.get("http://localhost:3000/genres?genre=" + decodeURIComponent(req.params.id))
    .then(resp => {
        var genre = resp.data[0]
        res.render('genre', { genre: genre, date: d });
    })
  .catch(err => next(err))
});
