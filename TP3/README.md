# TP3: Servidor Aplicacional - Escola de Música
**Data:** 20 de Fev. 2026<br>
**Autor:** Soraia Pereira<br>
**UC:** Engenharia Web 2025/2026


## Autor:
**Nome:** Soraia Filipa Ribeiro Pereira<br>
**ID:** 106806

<img src="../foto.png" width="400"/>

## Resumo:
O servidor aplicacional responde a pedidos HTTP e apresenta os dados de uma escola de música em formato HTML.
Os dados da escola de música são obtidos através de pedidos HTTP ao json-server criado através do [dataset da escola de música](db.json).
Os serviços implementados pelo servidor são:
* `/alunos` - Apresenta uma tabela com o ID, nome, data de nascimento, curso, ano do curso e instrumento dos alunos ordenados pelo seu ID.
* `/cursos` - Apresenta uma tabela com o ID, nome, duração e o instrumento associado a cada curso, ordenados pelo seu ID.
* `/instrumentos` - Apresenta uma tabela com o ID e nome de cada instrumento, ordenados pelo seu ID.

## Resultados:
* [Servidor](serverAPI.js) - Servidor que responde a pedidos HTTP na porta 7777.<br>

Endpoints disponíveis:
  * http://localhost:7777/ - Página principal com um índice para os serviços disponíveis.
  * http://localhost:7777/alunos
  * http://localhost:7777/cursos
  * http://localhost:7777/instrumentos


### Execução:
1. Instalar as dependências:
```
npm install axios
```
2. Inicializar o json-server:
```
json-server --watch db.json
```
3. Inicializar o servidor:
```
node serverAPI.js
```