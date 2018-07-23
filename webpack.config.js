const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        vendors: ['vue', 'vue-router', 'axios']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.join(__dirname, 'server/public/assets')
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [{
            test: /\.(js|vue)$/,
            use: 'eslint-loader',
            enforce: 'pre'
        },
        {
            test: /\.vue$/,
            exclude: /node_modules/,
            loader: 'vue-loader'
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    compact: 'false'
                }
            }
        }]
    },
    plugins: [
        new CleanWebpackPlugin(['./server/public']),
        new HtmlWebpackPlugin({
            title: 'ToDo App',
            template: './src/index.html',
            filename: './../index.html',
            inject: true
        }),
        new VueLoaderPlugin(),
    ]
}