#!/usr/bin/env node

const meow = require('meow');
const path = require('path');

const createHandler = require('../src/createHandler');
const Compiler = require('../src/compiler');

const cli = meow(
    `
    Usage
      $ rsl <command>

    Commands
      build | Build production bundle
      start   | Start the server
 
    Examples
      $ rsl dev
`,
    {}
);

const command = cli.input[0];
const cwd = process.cwd();
const mode = process.env.NODE_ENV || 'development';
const settings = require(path.join(cwd, 'package.json')).rsl || {};

const configComposer = require(path.join(cwd, settings.webpack));

const configs = {
    client: configComposer({
        mode,
        server: false
    }),
    server: configComposer({
        mode,
        server: true
    })
};

const entries = {
    client: path.join(cwd, settings.client),
    server: path.join(cwd, settings.server)
};

switch (command) {
    case 'start': {
        const entry = require(path.join(cwd, settings.entry));

        const handler = createHandler();

        const compiler = new Compiler({
            configs,
            mode,
            entries
        });

        if (mode === 'development') {
            compiler
                .build()
                .then(() => {
                    entry({
                        handler,
                        initMiddleware: compiler.initMiddleware
                    });
                })
                .catch(e => {
                    console.error(e);
                });
        } else {
            entry({
                handler
            });
        }

        break;
    }

    case 'build': {
        const compiler = new Compiler({
            configs,
            mode: 'production',
            entries
        });

        compiler.build().then(() => {
            console.log('All done');
        });

        break;
    }

    default:
        cli.showHelp();

        break;
}
