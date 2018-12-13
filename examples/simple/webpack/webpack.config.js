/*

This is the base of our webpack configuration.

We can define the settings and plugins which should be
the same for all environments and then reuse them in our
compose.js file.

*/

const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const configuration = {
    // resolve all relative paths from the project root folder
    context: process.cwd(),
    mainFields: ['module', 'main', 'browser'],

    performance: {
        hints: false
    },

    output: {
        // file name pattern for entry scripts
        filename: '[name].[hash].js',

        // file name pattern for chunk scripts
        chunkFilename: '[name].[hash].js'
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    // Cache loader speeds up the builds
                    'cache-loader',
                    {
                        loader: 'babel-loader',
                        query: {compact: false}
                    }
                ],
                exclude: [/node_modules/]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            },
            {
                // Image handling
                test: /\.(jpg|png|webp)$/,
                use: [
                    'file-loader',
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            disable: true,
                            webp: {
                                enabled: true
                            }
                        }
                    }
                ]
            },
            {
                // Svg icons handling
                test: /\.svg$/,
                loader: 'svg-react-loader',
                exclude: /node_modules/
            },
            // Fonts handling
            ...[
                /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/
            ].map(font => ({
                test: font,
                // This include is important, because if you remove this
                // then svg fonts will be handled by svg-react-loader
                // which is incorrect
                include: [/fonts/],
                loader: 'file-loader'
            }))
        ]
    },
    resolve: {
        modules: ['node_modules'],
        // Directory aliases
        alias: {
            components: path.resolve(__dirname, '../src/components'),
            screens: path.resolve(__dirname, '../src/screens'),
            core: path.resolve(__dirname, '../src/core')
        },
        plugins: []
    },

    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css',
            chunkFilename: '[id].css'
        })
    ]
};

module.exports = configuration;
