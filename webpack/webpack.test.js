const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`--${NODE_ENV}`);
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