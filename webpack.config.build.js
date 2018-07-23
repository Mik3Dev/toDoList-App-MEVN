const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge(webpackConfig, {
    mode: 'production',
    devtool: 'source-map',
    module: {
        rules: [{
                test: /\.(sass|scss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }, {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]   
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: './bundle.css'
        })
    ],
    optimization: {
        minimizer: [
            new UglifyJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
})
