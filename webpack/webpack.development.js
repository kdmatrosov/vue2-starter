const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(`--${NODE_ENV}`);
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
    .expand('devServer', devServer)
    .plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common'
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
    }));
delete config.expand;
module.exports = config;