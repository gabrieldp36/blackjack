const htmlWebPack = require('html-webpack-plugin');
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");
const Terser = require("terser-webpack-plugin");
module.exports = {
    mode: 'production',
    output: {
        clean: true,
        filename: 'main.[contenthash].js'
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
                test:/\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                      presets: ['@babel/preset-env']
                    },
                },
            },
            {
                test: /\.js$/i,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer:[
            new CssMinimizer(),
            new Terser(),
        ],
    },
    plugins: [
        new htmlWebPack({
            title: 'Mi Webpack App',
            template:'./src/index.html',
            filename:'./index.html',
            inject: 'body',
        }),
        new MiniCssExtract({
            filename:'[name].[fullhash].css',
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: 'src/assets/', to: 'assets/' },
            ],
        }),
    ],
}