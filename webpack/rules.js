const ExtractTextPlugin = require("extract-text-webpack-plugin");
const resolve = require('./resolve');

module.exports = [
    {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders: {
                css: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: process.env.NODE_ENV === 'production',
                                sourceMap: process.env.NODE_ENV !== 'production'
                            }
                        }
                    ],
                    fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                }),
                postcss: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: process.env.NODE_ENV === 'production',
                                sourceMap: process.env.NODE_ENV !== 'production'
                            }
                        }
                    ],
                    fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
                })
            }
        }
    },
    {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
    },
    {
        test: /\.html$/,
        loader: 'html-loader'
    },
    {
        test: /\.pcss$/,
        loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            loader: [
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                {
                    loader: 'postcss-loader'
                }
            ]
        })
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
];