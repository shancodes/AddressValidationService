const us = require('./us');
const uk = require('./uk');
const india = require('./india');

const formatMaps = {
    "us": us,
    "uk": uk,
    "india": india,
}

module.exports = formatMaps;