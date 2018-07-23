const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const path = require('path');
const webpack = require('webpack');

module.exports = merge(webpackConfig, {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [{
                test: /\.(sass|scss)$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]   
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, './server/public'),
        hot: true,
        open: true,
        publicPath: '/',
        watchOptions: {
            poll: true
        },
        host: 'localhost',
        port: 8080
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin({})
    ]
})