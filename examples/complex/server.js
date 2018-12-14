const path = require('path');

const fastify = require('fastify');

// Webpack config composer

const urlData = require('fastify-url-data');
const serveStatic = require('serve-static');

const config = require('./config/server');

const app = fastify();

app.register(urlData);

const start = ({handler, initMiddleware}) => {
    if (initMiddleware) {
        initMiddleware(app);
    }

    app.route({
        method: 'GET',
        url: '*',
        handler
    });

    app.use(serveStatic(path.resolve(__dirname, './webroot')));

    app.listen(config.port, config.host, error => {
        if (error) {
            throw error;
        }

        console.log(`Server was spawned at PORT ${config.port}`);
    });
};

module.exports = start;
