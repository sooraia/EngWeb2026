#!/bin/bash
# Importa o JSON para a base de dados
mongoimport --host localhost --db autoRepair --collection repairs  --file /docker-entrypoint-initdb.d/dataset_reparacoes.json --jsonArray

# Cria o índice de texto necessário para o parâmetro ?q= funcionar
mongosh autoRepair --eval 'db.repairs.createIndex({ "viatura.marca": "text", "data": "text" })'