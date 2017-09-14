const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';
const resolve = require('./resolve');
const devServer = require('./devServer');
let config = require('./webpack.config');
config
    .expand('output', {
        path: resolve('/bundle'),
        publicPath: '/',
        filename: '[name].js'
    })
    .expand('devtool', '#eval-source-map')
    .expand('watch', NODE_ENV === 'watch')
    .expand('watchOptions', {
        aggregateTimeout: 100
    })
    .expand('devServer', devServer);
delete config.expand;
module.exports = config;