const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const apiMocker = require('mocker-api');

const SITE_TITLE = 'YOUR SITE TITLE HERE';

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build/'),
        filename: 'scripts/bundle.js',
        chunkFilename: 'scripts/bundle/[name].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx|js|jsx)$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                mode: 'local',
                                localIdentName: '[local]__[hash:base64:8]'
                            }
                        }
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCSSExtractPlugin(),
        new HTMLWebpackPlugin({
            title: SITE_TITLE,
            base: '/'
        }),
        new webpack.DefinePlugin({
            SITE_TITLE: JSON.stringify(SITE_TITLE)
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'source-map',
    devServer: {
        before(app) {
            apiMocker(app, path.resolve('./mocks'));
        },
        port: 3000,
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        historyApiFallback: true,
        hot: true,
        https: false
    }
};