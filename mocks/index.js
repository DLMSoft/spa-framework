const fs = require('fs');
const files = fs.readdirSync(__dirname);

let allMockers = {};

files.forEach(f => {
    if (f == 'index.js')
        return;
    const m = require('./' + f);

    allMockers = { ...allMockers, ...m };
});

module.exports = allMockers;