const escapeJson = string =>
    string
        .replace(/[\\]/g, '\\\\')
        .replace(/["]/g, '\\"')
        .replace(/[/]/g, '\\/')
        .replace(/[\b]/g, '\\b')
        .replace(/[\f]/g, '\\f')
        .replace(/[\n]/g, '\\n')
        .replace(/[\r]/g, '\\r')
        .replace(/[\t]/g, '\\t');

export const serializeData = ({config, data, locale}) => ({
    data: escapeJson(JSON.stringify(data)),
    config: escapeJson(JSON.stringify(config)),
    locale
});

export const deserializeData = ({config, data, locale}) => ({
    data: JSON.parse(data),
    config: JSON.parse(config),
    locale
});

export const generateClientData = ({config, data, locale}) => `
    window._data="${data}";
    window._config="${config}";
    window._locale="${locale}";
`;

export const getClientData = () => ({
    data: window._data,
    config: window._config,
    locale: window._locale
});
