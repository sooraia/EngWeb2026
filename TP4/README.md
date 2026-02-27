# TP4: Exames Médicos Desportivos
**Data:** 20 de Fev. 2026<br>
**Autor:** Soraia Pereira<br>
**UC:** Engenharia Web 2025/2026


## Autor:
**Nome:** Soraia Filipa Ribeiro Pereira<br>
**ID:** 106806

<img src="../foto.png" width="400"/>

## Resumo:
O servidor aplicacional responde a pedidos HTTP e apresenta os dados de exames médicos desportivos, obtidos a partir de um json-server que serve uma [versão normalizada do dataset original](data/emd_normalized.json). 
Os pedidos HTTP a que o servidor responde são:
* `GET /` ou `GET /emd` - Apresenta a página principal com uma tabela com o nome, data, modalidade e resultado de cada exame médico desportivo.
* `GET /emd/:id` - Apresenta os detalhes de um exame médico desportivo específico, identificado pelo seu ID.
* `GET /emd/registo` - Apresenta um formulário para registar um novo exame médico desportivo.
* `POST /emd` - Recebe os dados do formulário de registo e adiciona um novo exame médico desportivo ao dataset.
* `GET /emd/editar/:id` - Apresenta um formulário para editar um exame médico desportivo específico, identificado pelo seu ID.
* `POST /emd/:id` - Recebe os dados do formulário de edição e atualiza o exame médico desportivo correspondente no dataset.
* `GET /emd/apagar/:id` - Apaga um exame médico desportivo específico do dataset e redireciona para a página principal.
* `GET /emd/stats` - Apresenta as distribuições dos registos por: género, modalidade, clube, federado e resultado.
* `GET /emd?sort=nome` - Redireciona para a página principal, com os registos ordenados por nome.
* `GET /emd?sort=data` - Redireciona para a página principal, com os registos ordenados por data.

## Resultados:
* [Dataset Original](data/emd_original.json) - Dataset original.
* [Dataset Normalizado](data/emd_normalized.json) - Versão normalizada do dataset original, utilizada pelo json-server.
* [Script de Normalização](normalize_dataset.py) - Script Python utilizado para normalizar o dataset original.
* [Servidor](emd_server.js) - Servidor que responde a pedidos HTTP na porta 7777.
* [Vistas](views/) - Templates Pug utilizados para gerar as páginas HTML.

Endpoints disponíveis:
* http://localhost:7777/
* http://localhost:7777/emd
* http://localhost:7777/emd/:id
* http://localhost:7777/emd/registo
* http://localhost:7777/emd/editar/:id
* http://localhost:7777/emd/apagar/:id
* http://localhost:7777/emd/stats
* http://localhost:7777/emd?sort=nome
* http://localhost:7777/emd?sort=data

### Execução:
1. Instalar as dependências:
```
npm install
```
2. Inicializar o json-server:
```
json-server --watch data/emd_normalized.json
```
3. Inicializar o servidor:
```
node emd_server.js
```