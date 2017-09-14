const resolve = require('./resolve');
let config = require('./webpack.config');
config.expand('output', {
        path: resolve('/bundle'),
        publicPath: '/',
        filename: '[name].js'
    }
).expand('devtool', '#inline-source-map');
delete config.expand;
delete config.entry;
module.exports = config;