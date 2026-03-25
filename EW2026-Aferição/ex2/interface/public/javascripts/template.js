const pug = require('pug');

// Helper para compilar e renderizar
function renderPug(fileName, data) {
    return pug.renderFile(`./views/${fileName}.pug`, data);
}

exports.repairsListPage = (reparacoes, d) => renderPug('index', { list: reparacoes, date: d });
exports.repairIndividualPage = (reparacao, d) => renderPug('repair', { reparacao: reparacao, date: d });
exports.marcaPage = (marca, reparacoes, d) => renderPug('marca', { marca: marca, reparacoes: reparacoes, date: d });