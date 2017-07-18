const ExtractTextPlugin = require("extract-text-webpack-plugin");
exports.cssLoaders = function (options) {
    options = options || {}
    const cssLoader = {
        loader: 'css-loader',
        options: {
            minimize: options.minimize,
            sourceMap: options.sourceMap,
            importLoaders: 1
        }
    }

    function getLoader (loader, loaderOptions) {
        let loaders = [cssLoader]
        if (loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, {
                    minimize: options.minimize,
                    sourceMap: options.sourceMap
                })
            })
        }
        if (options.ExtractTextPlugin) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        } else {
            return ['vue-style-loader'].concat(loaders)
        }
    }

    return {
        css: getLoader(),
        pcss: getLoader('postcss', {}),
        less: getLoader('less'),
        sass: getLoader('sass'),
        scss: getLoader('sass'),
        stylus: getLoader('stylus'),
        styl: getLoader('stylus')
    };
};

exports.styleLoaders = function (options) {
    let output = [];
    const loaders = exports.cssLoaders(Object.assign({}, options, {
        importLoaders: 1
    }));
    for (let extension in loaders) {
        let loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        });
    }
    return output;
};