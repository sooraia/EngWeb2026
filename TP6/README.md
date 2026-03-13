# TP6: Orquestralão de Serviços para uma App de Cinema Americano
**Data:** 12 de Mar. 2026<br>
**Autor:** Soraia Pereira<br>
**UC:** Engenharia Web 2025/2026


## Autor:
**Nome:** Soraia Filipa Ribeiro Pereira<br>
**ID:** 106806

<img src="../foto.png" width="400"/>

## Resumo:
Orquestração de serviços utilizando Docker Compose para visualizar dados de filmes, géneros e atores de cinema americano. Os serviços orquestrados em containers Docker são:
* uma base de dados MongoDB.
* uma API REST em Express, para fornecer os dados armazenados no MongoDB através de endpoints HTTP.
* um servidor aplicacional em Express para apresentar os dados através de uma interface web.

Os pedidos a que o servidor da interface responde são:
* `GET /` ou `GET /filmes` - Tabela com os campos id, título, ano, número de géneros e número de atores dos filmes, ordenável por nome ou ano.
* `GET /filmes/:id` - Apresenta os detalhes de um filme específico.
* `GET /atores` - Tabela de atores com os campos nome e número de filmes em que participou.
* `GET /atores/:id` - Apresenta os detalhes de um ator especifico.
* `GET /generos` - Tabela com o nome e númmero de filmes de cada género.
* `GET /generos/:id` - Apresenta os detalhes de um género específico.

## Resultados:
- [Script de Normalização do Dataset](normalize.py)
- [API de dados](api-dados/)
- [Servidor Aplicacional para a Interface](interface/)
- [Docker Compose](docker-compose.yml)

* Endpoints disponíveis para a interface:
  * http://localhost:7790/
  * http://localhost:7790/filmes
  * http://localhost:7790/filmes/:id
  * http://localhost:7790/atores
  * http://localhost:7790/atores/:id
  * http://localhost:7790/generos
  * http://localhost:7790/generos/:id

### Execução:
```
docker compose up -d --build
```