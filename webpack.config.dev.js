const path = require('path');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const MockWebpackPlugin = require('mockjs-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const WEBSITE_TITLE = 'DLMSoft React SPA Framework';

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'build'),
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
            }
        ]
    },
    plugins: [
        new MiniCSSExtractPlugin(),
        new MockWebpackPlugin({
            path: path.join(__dirname, './mocks'),
            port: 3001
        }),
        new HTMLWebpackPlugin({
            title: WEBSITE_TITLE
        })
    ],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: 'source-map',
    devServer: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:3001/',
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        historyApiFallback: true,
        hot: true,
        https: false
    }
};