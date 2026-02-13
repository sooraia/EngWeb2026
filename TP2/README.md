# TP2: Servidor HTTP para Reparações numa Oficina Automóvel
**Data:** 12 de Fev. 2026<br>
**Autor:** Soraia Pereira<br>
**UC:** Engenharia Web 2025/2026


## Autor:
**Nome:** Soraia Filipa Ribeiro Pereira<br>
**ID:** 106806

<img src="foto.png" width="400"/>

## Resumo:
O servidor HTTP responde a pedidos com uma página HTML que apresenta os dados de reparações numa oficina automóvel. 
Os dados das reparações são obtidos através de pedidos HTTP ao json-server criado através do [dataset de reparações](dataset_reparacoes.json). Os endpoints implementados são os seguintes:
* `/reparacoes` - Apresenta uma tabela com os dados das reparações ordenadas por ordem alfabética de nome. 
* `/intervencoes` - Apresenta uma tabela com os diferentes tipos de intervenção, ordenados por código.
* `/viaturas` - Apresenta uma tabela com os dados dos tipos de viatura (marcas e modelos) que foram reparados.

## Resultados:
* [Servidor HTTP](servidor_reparacoes.js) - Servidor que responde a pedidos HTTP e apresenta os dados das reparações em formato HTML.<br>

Endpoints disponíveis:
  * http://localhost:7777/reparacoes
  * http://localhost:7777/intervencoes
  * http://localhost:7777/viaturas


### Execução:
1. Instalar as dependências:
```
npm install axios
```
2. Inicializar o json-server:
```
json-server --watch dataset_reparações.json
```
3. Inicializar o servidor HTTP:
```
node servidor_reparacoes.js
```