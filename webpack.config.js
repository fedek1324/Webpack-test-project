const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin


const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const getFilename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const getCssLoaders = extra => {
    const loaders = [
        MiniCssExtractPlugin.loader,
        'css-loader',
    ]

    if (extra) {
        loaders.push(extra)
    }
    return loaders;
}

const defaultBabelOptions = {
    presets: [
        '@babel/preset-env'
    ],
    plugins: [
        '@babel/plugin-proposal-class-properties'
    ]
}

const getPlugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }]
        }),
        new MiniCssExtractPlugin({
            filename: getFilename('css'),
        }),
        new ESLintPlugin(),
    ]

    // if (isProd) {
    //     base.push(new BundleAnalyzerPlugin())
    // }

    return base

}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: ['@babel/polyfill', './index.jsx'],
        analytics: './analytics.ts'
    },
    output: {
        filename: getFilename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js', '.png'], // теперь можно писать import '../jsFile' без .js в конце
        // (но на самом деле это стандартная конфигуряция для .js)
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
    devServer: {
        open: true,
        port: 4200,
        hot: isDev
    },
    devtool: 'source-map' ,
    plugins: getPlugins(),
    module: {
        rules: [{
                test: /\.css$/,
                use: getCssLoaders()
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                type: 'asset/resource'
            },
            {
                test: /\.less$/,
                use: getCssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: getCssLoaders('sass-loader')
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: defaultBabelOptions
                }
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: isDev ? [{
                    loader: 'babel-loader',
                    options: {...defaultBabelOptions, 
                        presets : [...defaultBabelOptions.presets, '@babel/preset-typescript']}
                    //сверху слишком сложная конструкция вроде, лучше наверное через функцию
                }] :
                {
                    loader: 'babel-loader',
                    options: {...defaultBabelOptions, 
                        presets : [...defaultBabelOptions.presets, '@babel/preset-typescript']}
                    //сверху слишком сложная конструкция вроде, лучше наверное через функцию
                }
            },
            {
                test:/\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {...defaultBabelOptions, 
                        presets : [...defaultBabelOptions.presets, '@babel/preset-react']}
                    //сверху слишком сложная конструкция вроде, лучше наверное через функцию
                }
            }
        ]
    }
}