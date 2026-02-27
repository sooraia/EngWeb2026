const pug = require('pug');

// Helper para compilar e renderizar
function renderPug(fileName, data) {
    return pug.renderFile(`./views/${fileName}.pug`, data);
}

exports.emdListPage = (tlist, d, sort_data) => renderPug('index', { list: tlist, date: d, sort_data: sort_data });
exports.emdIndividualPage = (emd, d) => renderPug('emd', { emd: emd, date: d });
exports.emdFormPage = (emd, d) => renderPug('form', { emd: emd, date: d });
exports.emdStatsPage = (stats, d) => renderPug('stats', { stats: stats, date: d });
exports.errorPage = (msg, d) => renderPug('error', { message: msg, date: d });
