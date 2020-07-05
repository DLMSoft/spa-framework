const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const MockWebpackPlugin = require('mockjs-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const WEBSITE_TITLE = 'DLMSoft React SPA Framework';

module.exports = {
    mode: 'production',
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    MiniCSSExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            esModule: true
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    plugins: [
        new MiniCSSExtractPlugin(),
        //new MockWebpackPlugin(),
        new HTMLWebpackPlugin({
            title: WEBSITE_TITLE
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: false,
};