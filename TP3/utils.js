// --- Funções utilitárias

function pagina(titulo, corpo){
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8"/>
        <title>${titulo}</title>
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
    </head>
    <body class="w3-light-grey">

        <div class="w3-container w3-teal">
            <h1>${titulo}</h1>
        </div>

        <div class="w3-container w3-margin-top">
            ${corpo}
        </div>

    </body>
    </html>
    `
}

function link(href, texto){
    return `<a href="${href}">${texto}</a>`
}

function card(titulo, conteudo){
    return `
    <div class="w3-card-4 w3-white w3-margin-bottom">
        <header class="w3-container w3-teal">
            <h3>${titulo}</h3>
        </header>
        <div class="w3-container w3-padding">
            ${conteudo}
        </div>
    </div>
    `
}

function table(headers, rows){
    return `
    <table class="w3-table w3-bordered w3-striped w3-white">
        <tr class="w3-light-grey">
            ${headers.map(h => `<th>${h}</th>`).join("\n")}
        </tr>
        ${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join("\n")}</tr>`).join("\n")}
    </table>
    `
}

function lista(items){
    if(items.length === 0)
        return `<p><i>Sem registos.</i></p>`

    return `
      <ul class="w3-ul w3-hoverable">
        ${items.map(i => `<li>${i}</li>`).join("\n")}
      </ul>
    `
}

function botaoVoltar(){
    return `<a class="w3-button w3-teal w3-margin-top" href="/">Voltar</a>`
}

module.exports = {
    pagina,
    link,
    card,
    lista,
    table,
    botaoVoltar
}
