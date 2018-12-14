/**
 * Isomorphic configuration for in-app usage
 */

/* eslint-disable global-require, import/no-mutable-exports, no-undef */
let config;

if (__SERVER__) {
    const client = require('./client');

    // Override client settings
    config = client;
} else {
    // window._config comes from getServerEntry()
    config = JSON.parse(window._config);
}

export default config;
