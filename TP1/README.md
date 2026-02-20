# TP1: Website para exploração de reparações realizadas numa oficina automóvel
**Data:** 4 de Fev. 2026<br>
**Autor:** Soraia Pereira<br>
**UC:** Engenharia Web 2025/2026


## Autor:
**Nome:** Soraia Filipa Ribeiro Pereira<br>
**ID:** 106806

<img src="../foto.png" width="400"/>

## Resumo:
O [script em Python](json2html.py) desenvolvido gera páginas HTML a partir de um [dataset](dataset_reparacoes.json) em formato JSON de reparações realizadas numa oficina automóvel. Primeiramente é percorrida a lista de reparações, criando páginas individuais para cada reparação e armazenando em dicionários auxiliares informação sobre as reparações, os tipos de intervenção e os pares marca/modelo, assim como a lista dos NIFs das reparações a que estão associados. Em seguida, itera-se sobre estes dicionários para criar as páginas individuais de cada intervenção e marca/modelo. No final são geradas as páginas principais com as listagens das reparações, intervenções e marcas/modelos com links para as páginas individuais correspondentes.

## Resultados:
* [Script](json2html.py) - Script em Python para gerar as páginas HTML a partir do dataset JSON.
* [Dataset](dataset_reparacoes.json) - Dataset de reparações realizadas numa oficina automóvel em formato JSON.

**Output Gerado:**
* [Página principal](output/index.html) - Página com um índice para as listagens das reparações, intervenções e marcas/modelos.
* [Lista de Reparações](output/reparacoes.html) - Página com a listagem de todas as reparações, com links para as páginas individuais de cada reparação.
* [Lista de Intervenções](output/intervencoes.html) - Página com a listagem de todas as intervenções, com links para as páginas individuais de cada intervenção.
* [Lista de Marcas/Modelos](output/marcas_modelos.html) - Página com a listagem de todas as marcas/modelos, com links para as páginas individuais de cada marca/modelo.
* [Páginas individuais das reparações](output/reparacoes) - Diretório com as páginas individuais de cada reparação.
* [Páginas individuais das intervenções](output/intervencoes) - Diretório com as páginas individuais de cada intervenção.
* [Páginas individuais das marcas/modelos](output/marcas_modelos) - Diretório com as páginas individuais de cada marca/modelo.