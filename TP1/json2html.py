import json, os, shutil

def open_json(filename):
    with open(filename, encoding="utf-8") as f:
        data = json.load(f)
    return data

def mk_dir(relative_path):
    if not os.path.exists(relative_path):
        os.mkdir(relative_path)
    else:
        shutil.rmtree(relative_path)
        os.mkdir(relative_path)

def new_file(filename, content):
    with open(filename, "w", encoding="utf-8") as f:
        f.write(content)

# Script principal
mk_dir("output")
mk_dir("output/reparacoes")
mk_dir("output/intervencoes")
mk_dir("output/marcas_modelos")

dataset = open_json("dataset_reparacoes.json")

reparacoes = {}

carros_marcas = {}

tipos_intervencao = {}
intervencoes_reparacoes = {}

lista_reparacoes = ""
lista_intervencoes = ""
lista_marcas = ""

for rep in sorted(dataset["reparacoes"], key = lambda r: r["data"]):
    reparacoes[rep["nif"]] = rep.copy()
    marca = rep["viatura"]["marca"]
    modelo = rep["viatura"]["modelo"]
    if marca not in carros_marcas:
        carros_marcas[marca] = {}
    if modelo not in carros_marcas[marca]:
        carros_marcas[marca][modelo] = []
    carros_marcas[marca][modelo].append(rep["nif"])

    #página reparação
    html_rep = f'''
    <html>
        <head>
            <title>{ rep["nif"] } - { rep["data"] }</title>
            <meta charset="utf-8"/>
        </head>
        <body>
            <h2>Reparação de { rep["nome"]} a { rep["data"] }</h2>
            <table border="1">
                <tr><td>Nome</td><td>{ rep["nome"] }</td></tr>
                <tr><td>NIF</td><td>{ rep["nif"] }</td></tr>
                <tr><td>Data</td><td>{ rep["data"] }</td></tr>
                <tr><td>Marca</td><td>{ rep["viatura"]["marca"] }</td></tr>
                <tr><td>Modelo</td><td>{ rep["viatura"]["modelo"] }</td></tr>
                <tr><td>Matrícula</td><td>{ rep["viatura"]["matricula"] }</td></tr>
            </table>
            <hr/>
            <h3>Intervenções realizadas:</h3>
            <ul>
    '''
    for interv in rep["intervencoes"]:
        if interv["codigo"] not in tipos_intervencao:
            tipos_intervencao[interv["codigo"]] = interv.copy()
            intervencoes_reparacoes[interv["codigo"]] = []
        if rep["nif"] not in intervencoes_reparacoes[interv["codigo"]]:
            intervencoes_reparacoes[interv["codigo"]].append(rep["nif"])

        html_rep += f'''
        <li><a href="../intervencoes/{ interv["codigo"] }.html">{ interv["nome"] }</a></li>
        '''
    html_rep += '''
            </ul>
            <hr/>
            <h4><a href="../reparacoes.html">Voltar à lista de reparações</a></h4>
        </body>
    </html>
    '''
    new_file(f"./output/reparacoes/{ rep["nif"] }.html", html_rep)

    # lista de reparações
    lista_reparacoes += f'''
    <tr>
        <td>{ rep["data"] }</td>
        <td>{ rep["nif"] }</td>
        <td>{ rep["nome"] }</td>
        <td>{ rep["viatura"]["marca"] }</td>
        <td>{ rep["viatura"]["modelo"] }</td>
        <td>{ rep["nr_intervencoes"] }</td>
        <td><a href="reparacoes/{ rep["nif"] }.html">Ver Detalhes</a></td>
    </tr>
    '''

for interv in sorted(tipos_intervencao.values(), key = lambda i: i["codigo"]):
        #página intervenção
        html_interv = f'''
        <html>
            <head>
                <title>{ interv["nome"] }</title>
                <meta charset="utf-8"/>
            </head>
            <body>
                <h2>{ interv["nome"] }</h2>
                <table border="1">
                    <tr><td>código</td><td>{interv["codigo"]}</td></tr>
                    <tr><td>nome</td><td>{interv["nome"]}</td></tr>
                    <tr><td>descrição</td><td>{interv["descricao"]}</td></tr>
                </table>
                <hr/>
                <h3>Reparações onde foi realizada:</h3>
                <ul>
        '''

        for nif in intervencoes_reparacoes[interv["codigo"]]:
            rep = reparacoes[nif]
            html_interv += f'''
            <li><a href="../reparacoes/{ rep["nif"] }.html">{ rep["data"] }: { rep["viatura"]["marca"] } { rep["viatura"]["modelo"] }</a></li>
            '''
        html_interv += '''
                </ul>
                <hr/>
                <h4><a href="../intervencoes.html">Voltar à lista de intervenções</a></h4>
            </body>
        </html>
        '''
        new_file(f"./output/intervencoes/{interv["codigo"]}.html", html_interv)

        #lista de intervenções
        lista_intervencoes += f'''
        <tr>
            <td>{ interv["codigo"] }</td>
            <td>{ interv["nome"] }</td>
            <td>{ interv["descricao"] }</td>
            <td><a href="intervencoes/{ interv["codigo"] }.html">Ver Detalhes</a></td>
        </tr>
        '''

for marca in sorted(carros_marcas.keys()):
    for modelo in sorted(carros_marcas[marca].keys()):
        num_carros = len(carros_marcas[marca][modelo])
        # página marca/modelo
        html_marca = f'''
        <html>
            <head>
                <title>{ marca } { modelo }</title>
                <meta charset="utf-8"/>
            </head>
            <body>
                <h2>{ marca } { modelo }</h2>
                <table border="1">
                    <tr><td>Marca</td><td>{ marca }</td></tr>
                    <tr><td>Modelo</td><td>{ modelo }</td></tr>
                    <tr><td>Número de carros</td><td>{ num_carros }</td></tr>
                </table>
                <hr/>
                <h3>Reparações realizadas:</h3>
                <ul>
        '''
        for nif in carros_marcas[marca][modelo]:
            rep = reparacoes[nif]
            html_marca += f'''
            <li><a href="../reparacoes/{ rep["nif"] }.html">{ rep["data"] }: { rep["nome"] }</a></li>
            '''

        html_marca += '''
                </ul>
                <hr/>
                <h4><a href="../marcas_modelos.html">Voltar à lista de marcas e modelos</a></h4>
            </body>
        </html>
        '''
        new_file(f"./output/marcas_modelos/{ marca }_{ modelo }.html", html_marca)

        # página lista de marcas/modelos
        lista_marcas += f'''
        <tr>
            <td>{ marca }</td>
            <td>{ modelo }</td>
            <td>{ num_carros }</td>
            <td><a href="marcas_modelos/{ marca }_{ modelo }.html">Ver Detalhes</a></td>
        </tr>
        '''

    
html =f'''
<html>
    <head>
        <title>Lista de Reparações</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h2>Índice</h2>
        <ul>
            <li><a href="reparacoes.html">Reparações</a></li>
            <li><a href="intervencoes.html">Intervenções</a></li>
            <li><a href="marcas_modelos.html">Marcas</a></li>
        </ul>
    </body>
</html>
'''

html_reparacoes =f'''
<html>
    <head>
        <title>Lista de Reparações</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h2>Reparações</h2>
        <h4><a href="index.html">Voltar ao índice</a></h4>
        <table border="1">
            <tr><th>Data</th><th>NIF</th><th>Nome</th><th>Marca</th><th>Modelo</th><th>Número de Intervenções</th></tr>
            {lista_reparacoes}
        </table>
    </body>
</html>
'''

html_intervencoes =f'''
<html>
    <head>
        <title>Lista de Intervenções</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h2>Intervenções</h2>
        <h4><a href="index.html">Voltar ao índice</a></h4>
        <table border="1">
            <tr><th>Código</th><th>Nome</th><th>Descrição</th></tr>
            {lista_intervencoes}
        </table>
    </body>
</html>
'''

html_marcas =f'''
<html>
    <head>
        <title>Lista de Marcas e Modelos</title>
        <meta charset="utf-8"/>
    </head>
    <body>
        <h2>Marcas e Modelos</h2>
        <h4><a href="index.html">Voltar ao índice</a></h4>
        <table border="1">
            <tr><th>Marca</th><th>Modelo</th><th>Número de carros</th></tr>
            {lista_marcas}
        </table>
    </body>
</html>
'''

new_file('./output/reparacoes.html', html_reparacoes)
new_file('./output/intervencoes.html', html_intervencoes)
new_file('./output/marcas_modelos.html', html_marcas)
new_file('./output/index.html', html)