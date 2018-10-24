const path = require('path');
const escapeString = require('js-string-escape');

const constants = require('./constants');

const rootFolder = process.cwd();

function normalizeAssets(assets) {
    const assetsArray = Array.isArray(assets) ? assets : [assets];

    return assetsArray.reduce((reduction, filename) => {
        if (!filename) {
            return reduction;
        }

        const extension = path.extname(filename).substr(1);

        return {
            ...reduction,
            [extension]: [
                ...(reduction.extension || []),
                path.join(constants.CLIENT_PUBLIC_PATH, filename)
            ]
        };
    }, {});
}

// Compose server bundle regex
const serverBundleRegexp = new RegExp(
    escapeString(
        path.join(
            rootFolder,
            constants.BUILD_PATH,
            constants.SERVER_BUILD_FOLDER
        )
    ),
    'g'
);

const serverEntryPath = path.join(
    rootFolder,
    constants.BUILD_PATH,
    constants.SERVER_BUILD_FOLDER,
    constants.SERVER_BUNDLE_NAME
);

const serverFileRegexp = /server[/\\].*\.js/;

const chunksPath = path.join(
    rootFolder,
    constants.BUILD_PATH,
    constants.CHUNKS_FILE_NAME
);

const chunksRegexp = new RegExp(escapeString(chunksPath), 'g');

const publicPath = constants.CLIENT_PUBLIC_PATH;

module.exports = {
    normalizeAssets,
    serverBundleRegexp,
    serverEntryPath,
    serverFileRegexp,
    chunksPath,
    chunksRegexp,
    publicPath
};
