# TP5: Servidor Aplicacional para Filmes
**Data:** 5 de Mar. 2026<br>
**Autor:** Soraia Pereira<br>
**UC:** Engenharia Web 2025/2026


## Autor:
**Nome:** Soraia Filipa Ribeiro Pereira<br>
**ID:** 106806

<img src="../foto.png" width="400"/>

## Resumo:
Servidor aplicacional em Express que responde a pedidos HTTP e apresenta os dados de filmes, atores e géneros, obtidos através de um json-server criado a partir de uma [versão normalizada do dataset original](data/cinema_normalized.json). 
Os pedidos a que o servidor responde são:
* `GET /` ou `GET /filmes` - Tabela com os campos id, título, ano, número de géneros e número de atores dos filmes, ordenável por nome ou ano.
* `GET /filmes/:id` - Apresenta os detalhes de um filme específico.
* `GET /atores` - Tabela de atores com os campos nome e número de filmes em que participou.
* `GET /atores/:ator` - Apresenta os detalhes de um ator especifico.
* `GET /generos` - Tabela com o nome e númmero de filmes de cada género.
* `GET /generos/:genero` - Apresenta os detalhes de um género específico.

## Resultados:
* [Dataset Original](data/cinema_original.json) - dataset original.
* [Dataset Normalizado](data/cinema_normalized.json) - versão normalizada do dataset original.
* [Script de Normalização](normalize_dataset.py) - script utilizado para normalizar o dataset original.
* [Servidor](cinema-app/) - servidor que responde a pedidos HTTP na porta 3000.
* [Vistas](cinema-app/views/) - templates Pug utilizados para gerar as páginas HTML.

* Endpoints disponíveis:
  * http://localhost:7777/
  * http://localhost:7777/filmes
  * http://localhost:7777/atores
  * http://localhost:7777/generos

### Execução:
1. Instalar as dependências:
```
npm install
```
2. Inicializar o json-server:
```
json-server --watch data/cinema_normalized.json
```
3. Inicializar o servidor:
```
cd cinema-app/
npm start
```