const webpackConfig = require('./../../webpack/webpack.test.js');
module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],
        reporters: ['spec'],
        // this is the entry file for all our tests.
        files: ['./index.js'],
        logLevel: config.LOG_DISABLE,
        preprocessors: {
            './index.js': ['webpack', 'sourcemap']
        },
        // use the webpack config
        webpack: webpackConfig,
        // avoid walls of useless text
        webpackMiddleware: {
            noInfo: true
        }
    })
};