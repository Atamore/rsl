// Core libraries
const fs = require('fs-extra');
const path = require('path');

// Webpack
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const constants = require('./constants');

// Utils
const {
    normalizeAssets,
    serverBundleRegexp,
    serverFileRegexp,
    chunksRegexp,
    chunksPath,
    publicPath
} = require('./utils');

class Compiler {
    constructor({configs, entries, mode}) {
        const clientConfig = {
            ...configs.client,
            entry:
                mode === 'development'
                    ? [
                          'webpack-hot-middleware/client?name=client',
                          entries.client
                      ]
                    : [entries.client],
            plugins: [
                ...configs.client.plugins,
                ...(mode === 'development'
                    ? [
                          new webpack.HotModuleReplacementPlugin({
                              multiStep: true
                          })
                      ]
                    : [])
            ],
            output: {
                ...(configs.client.output || {}),
                filename: constants.CLIENT_BUNDLE_NAME,
                path: path.join(
                    process.cwd(),
                    constants.BUILD_PATH,
                    constants.CLIENT_BUILD_FOLDER
                ),
                publicPath: constants.CLIENT_PUBLIC_PATH
            }
        };

        const serverConfig = {
            ...configs.server,
            entry: [entries.server],
            target: 'node',
            output: {
                ...(configs.server.output || {}),
                filename: constants.SERVER_BUNDLE_NAME,
                path: path.join(
                    process.cwd(),
                    constants.BUILD_PATH,
                    constants.SERVER_BUILD_FOLDER
                ),
                publicPath: constants.CLIENT_PUBLIC_PATH,
                libraryTarget: 'commonjs2'
            }
        };

        this.compiler = webpack([clientConfig, serverConfig]);

        this.initMiddleware = this.initMiddleware.bind(this);
    }

    build() {
        return new Promise((resolve, reject) => {
            this.compiler.run(async (err, stats) => {
                if (err) {
                    reject(err);
                }

                try {
                    await this.generateChunks(stats);

                    resolve(stats);
                } catch (e) {
                    reject(e);
                }
            });
        });
    }

    initMiddleware(app) {
        this.compiler.plugin('done', this.generateChunks.bind(this));
        // Apply dev middleware
        app.use(
            webpackDevMiddleware(this.compiler, {
                noInfo: true,
                publicPath,
                writeToDisk: filename => serverFileRegexp.test(filename),
                stats: {
                    colors: true,
                    hash: false,
                    timings: true,
                    chunks: false,
                    chunkModules: false,
                    modules: false
                }
            })
        );
        // Apply hot
        app.use(webpackHotMiddleware(this.compiler.compilers[0]));
    }

    async generateChunks(stats) {
        // Normalize chunk assets

        const assets = stats.stats[0].toJson().assetsByChunkName.main;

        if (assets) {
            const chunks = normalizeAssets(assets);

            // Write chunks to file
            await fs.writeFile(chunksPath, JSON.stringify(chunks), 'utf8');
        }

        this.clearCache();
    }

    clearCache() {
        // Clear server bundle cache on each new build
        Object.keys(require.cache).forEach(id => {
            if (serverBundleRegexp.test(id) || chunksRegexp.test(id)) {
                console.log('Clearing node bundle cache');

                delete require.cache[id];
            }
        });
    }
}

module.exports = Compiler;
