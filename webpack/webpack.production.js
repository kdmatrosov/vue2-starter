const webpack = require('webpack');
const resolve = require('./resolve');
let config = require('./webpack.config');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
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
    })
);
delete config.expand;
module.exports = config;