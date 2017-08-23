//Konfiguracja Webpack
const path = require("path");
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: "./js/main.js",
    output: {
        path: path.resolve("js"),
        filename: "out.js"
    },
    devServer: {
        inline: true,
        contentBase: './',
        port: 8999
    },
    watch: true,
    module: {
        loaders: [{
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-2', 'react']
            }
        },  {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader?-url','sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: '../css/style.css',
            disable: false,
            allChunks: true
        }),
    ]
}
