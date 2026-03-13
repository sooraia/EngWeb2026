#!/bin/bash
# Importa o JSON para a base de dados cinema, coleções filmes, atores e generos
mongoimport --host localhost --db cinema --collection filmes  --file /docker-entrypoint-initdb.d/filmes.json  --jsonArray
mongoimport --host localhost --db cinema --collection atores  --file /docker-entrypoint-initdb.d/atores.json  --jsonArray
mongoimport --host localhost --db cinema --collection generos --file /docker-entrypoint-initdb.d/generos.json --jsonArray

# Cria o índice de texto necessário para o parâmetro ?q= funcionar
mongosh cinema --eval 'db.filmes.createIndex({title: "text", year: "text"})'