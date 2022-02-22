const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].bundle.${ext}`;

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './js/main.js',
    output: {
        filename: `./js/${filename('js')}`,
        path: path.resolve(__dirname, 'app'),
        assetModuleFilename: '[path][name][ext][query]',
        clean:true
    },
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'app'),
        },
        historyApiFallback: true,
        open: true,
        compress: true,
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new MiniCssExtractPlugin({
            filename: `./css/${filename('css')}`
        }),
        new CopyPlugin({
            patterns: [
                { from: path.resolve(__dirname, 'src/assets/images'), to: path.resolve(__dirname, 'app/assets/images') }
            ]
        })
    ],
    module: {
        rules: [
            /*{
                test: /(\.js)$/,
                loader: 'babel-loader',
                exclude: /(node_modules|bower_components)/
            },*/
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.htm[l]?/i,
                loader: 'html-loader'
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                type: 'asset/resource'
            }
        ]
    }

}
