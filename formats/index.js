const us = require('./us');
const uk = require('./uk');
const india = require('./india');
const denmark = require('./denmark');
const italy = require('./italy');
const japan = require('./japan');
const mexico = require('./mexico');
const spain = require('./spain');
const brazil = require('./brazil');
const canada = require('./canada');

const formatMaps = {
    "us": us,
    "uk": uk,
    "india": india,
    "denmark": denmark,
    "italy": italy,
    "japan": japan,
    "mexico": mexico,
    "spain": spain,
    "brazil": brazil,
    "canada": canada,
}

module.exports = formatMaps;