const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const rules = require('./rules');
const NODE_ENV = process.env.NODE_ENV || 'development';
console.log(`--${NODE_ENV}`);
const resolve = require('./resolve');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const vendor = [
    'vue', 'vue-router', 'vuex',
    'axios', 'lodash', 'jquery'
];
module.exports = {
    entry: {
        index: './src/index.js',
        vendor: vendor
    },
    module: {
        rules: rules
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'common']
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin({filename: '[name].css', allChunks: true, disable: NODE_ENV === 'watch'}),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(NODE_ENV)
        }),
        new WebpackCleanupPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true,
            hash: true
        })
    ],
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        }
    },
    resolveLoader: {
        modules: ['node_modules'],
        moduleExtensions: ['-loader'],
        extensions: ['.js']
    },
    expand: function (key, value) {
        this[key] = value;
        return this;
    }
};