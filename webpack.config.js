const htmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    mode: 'development',
    output: {
        clean: true,
    },
    module: {
        rules: [
            {
                test:/\.html$/i,
                loader:'html-loader',
                options: {
                    sources: false,
                    minimize: false,
                },
            },
            {
                test:/\.css$/i,
                exclude: /styles.css$/i,
                use:['style-loader', 'css-loader'],
            },
            {
                test:/styles.css$/i,
                use:[MiniCssExtract.loader, 'css-loader'],
            },
            {
                test: /\.js$/i,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test:/\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
            },
        ],
    },
    optimization: {},
    plugins: [
        new htmlWebPack({
            title: 'Mi Webpack App',
            template:'./src/index.html',
            filename:'./index.html',
            inject: 'body',
        }),
        new MiniCssExtract({
            filename:'[name].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' },
            ],
        }),
    ],
}