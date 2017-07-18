const resolve = require('./resolve');
const controlStyles = require('./controlStyles');
const isProduction = process.env.NODE_ENV === 'production';
const STYLE_OPTIONS = {
    ExtractTextPlugin: isProduction, options: {
        minimize: isProduction,
        sourceMap: !isProduction
    }
};
const RULES = [
    {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders: controlStyles.cssLoaders(STYLE_OPTIONS)
        }
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: ['postcss.config.js'],
        include: [resolve('src'), resolve('test')]
    },
    {
        test: /\.html$/,
        loader: 'html-loader'
    },
    {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
            limit: 100,
            name: '[name].[hash:7].[ext]',
            outputPath: './assets/',
            publicPath: './assets/'
        }
    },
    {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
            limit: 100,
            name: '[name].[hash:7].[ext]',
            outputPath: './assets/',
            publicPath: './assets/'
        }
    }
].concat(controlStyles.styleLoaders(STYLE_OPTIONS));
module.exports = RULES;