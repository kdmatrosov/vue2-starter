const path = require('path');

module.exports = function (dir) {
    return path.join(__dirname, '..', dir);
};