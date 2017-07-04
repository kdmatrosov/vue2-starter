/*create devServer.js to config srver for your dev mode*/
module.exports = {
    historyApiFallback: true,
    port: 5000,
    contentBase: './',
    inline: true,
    hot: false
};