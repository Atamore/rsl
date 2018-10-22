const {chunksPath, serverEntryPath} = require('./utils');

const createHandler = () => (req, res) => {
    const assets = require(chunksPath);
    const entry = require(serverEntryPath);

    const handler = entry.default || entry;

    return handler(req, res, assets);
};

module.exports = createHandler;
