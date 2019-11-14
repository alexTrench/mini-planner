const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, 'dist')
const SRC_PATH = path.resolve(__dirname, 'src')
const NODE_MODULES_PATH = path.resolve(__dirname, 'node_modules')

module.exports = {
    entry: path.resolve(SRC_PATH, 'index.ts'),
    output: {
        path: DIST_PATH,
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
        ],
    },
    resolve: {
        modules: [SRC_PATH, NODE_MODULES_PATH],
        extensions: ['.tsx', '.ts', '.js'],
    },
    devServer: {
        contentBase: DIST_PATH,
        compress: true,
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin(),
    ],
};
