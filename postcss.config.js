const resolve = require('./webpack/resolve');
const MAP = {
    '@styles': resolve('src/styles')
};

module.exports = {
    plugins: {
        'postcss-import': {
            resolve: function (imp, base, opt) {
                const slash = ~base.indexOf('/') ? '/' : '\\';
                let path = base + slash + imp;
                for (let key in MAP) {
                    if (~imp.indexOf(key)) {
                        path = MAP[key] + imp.split(key)[1] || '';
                    }
                }
                return path;
            }
        },
        'postcss-cssnext': {
            browsers: ['last 5 versions', '> 5%']
        },
        'precss': {},
        'postcss-calc': {}
    }
};