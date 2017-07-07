const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`--${NODE_ENV}`);
const resolve = require('./resolve');
let config = require('./webpack.config');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
config.expand('output', {
        path: resolve('/build'),
        publicPath: '/',
        filename: '[name].js'
    }
).plugins.push(
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
        cssProcessorOptions: {
            safe: true
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false,
            drop_console: true,
            unsafe: true
        }
    }),
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'index.html',
        inject: true
    })
);
delete config.expand;
module.exports = config;