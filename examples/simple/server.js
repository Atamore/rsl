const path = require('path');

const fastify = require('fastify');

// Webpack config composer

const urlData = require('fastify-url-data');
const serveStatic = require('serve-static');

const app = fastify();

app.register(urlData);

const start = ({handler, initMiddleware}) => {
    const port = 3000;
    const host = '127.0.0.1';

    if (initMiddleware) {
        initMiddleware(app);
    }

    app.route({
        method: 'GET',
        url: '*',
        handler
    });

    app.use(serveStatic(path.resolve(__dirname, './webroot')));

    app.listen(port, host, error => {
        if (error) {
            throw error;
        }

        console.log(`Server was spawned at PORT ${port}`);
    });
};

module.exports = start;
