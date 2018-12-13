/*

The purpose of this file is to tweak our base webpack configuration
depending on the environment.

The exported module should be a function, which accepts an object
with the following properties:

{
    mode: 'development' | 'production',
    server: true | false
}

In this example we apply the following changes:

1. Apply DefinePlugin to provide our bundle with the information
about the environment
2. Enable uglify for production build, to minimize our code
3. Disable file-loader's file emit to prevent excessive disk usage
on server builds. On client builds they will remain in memory
4. Apply a sourcemap for client dev builds
5. Enable dev mode for plugins & loaders

*/

const webpack = require('webpack');

const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const baseConfig = require('./webpack.config.js');

function compose(options = {}) {
    const {mode = 'development', server = false} = options;

    const config = {
        mode,
        entry: baseConfig.entry,
        context: baseConfig.context,
        devtool: 'inline-source-map',
        resolve: baseConfig.resolve,
        output: baseConfig.output,
        module: {
            ...baseConfig.module,
            rules: baseConfig.module.rules
        },
        plugins: [
            ...baseConfig.plugins,
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(mode),
                'process.env.BABEL_ENV': JSON.stringify(mode),

                __CLIENT__: !server,
                __SERVER__: server,
                __PRODUCTION__: mode === 'production',
                __DEVELOPMENT__: mode === 'development'
            })
        ]
    };

    if (mode === 'production') {
        config.optimization = {
            minimizer: [new UglifyJsPlugin()]
        };
    }

    if (server) {
        // Prevent unnecessary disk writes on server builds
        config.module = {
            ...baseConfig.module,
            rules: baseConfig.module.rules.map(rule => {
                if (rule.loader === 'file-loader') {
                    return {
                        ...rule,
                        options: {
                            emitFile: false
                        }
                    };
                }

                return rule;
            })
        };

        // Don't bundle node_modules on server build
        config.externals = [nodeExternals()];
    } else if (mode === 'development') {
        // Enable dev mode for plugins & loaders
        config.plugins.push(
            new webpack.LoaderOptionsPlugin({
                debug: true
            })
        );

        // Set sourcemap
        config.devtool = 'inline-source-map';
    }

    return config;
}

module.exports = compose;
