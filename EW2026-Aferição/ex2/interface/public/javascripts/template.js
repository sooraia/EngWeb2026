const pug = require('pug');

// Helper para compilar e renderizar
function renderPug(fileName, data) {
    return pug.renderFile(`./views/${fileName}.pug`, data);
}

exports.repairsListPage = (reparacoes, d) => renderPug('index', { list: reparacoes, date: d });
exports.repairIndividualPage = (reparacao, d) => renderPug('repair', { reparacao: reparacao, date: d });
// exports.filmesIndividualPage = (filme, d) => renderPug('film', { filme: filme, date: d });
// exports.atoresListPage = (cast, d) => renderPug('actors', { list: cast, date: d });
// exports.atoresIndividualPage = (ator, d) => renderPug('actor', { ator: ator, date: d });
// exports.generosListPage = (filmes, d) => renderPug('genres', { list: filmes, date: d });
// exports.generosIndividualPage = (genre, d) => renderPug('genre', { genre: genre, date: d });
