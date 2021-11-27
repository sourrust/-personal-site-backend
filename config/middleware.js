'use strict';

require('dotenv').config();

function isProduction() {
    return process.env.NODE_ENV === 'production';
}

module.exports = {
    timeout: 100,
    load: {
        before: [
            'responseTime',
            'logger',
            'cors',
            'responses',
            'gzip',
        ],
        order: [
            'Define the middlewares\' load order by putting their name in this array is the right order',
        ],
        after: [
            'parser',
            'router',
        ],
    },
    settings: {
        favicon: {
            path: 'favicon.ico',
            maxAge: 86400000,
        },
        public: {
            path: './public',
            maxAge: 60000,
        },
        enabled: true,
        defaultLocale: 'en_us',
        modes: [
            'query',
            'subdomain',
            'cookie',
            'header',
            'url',
            'tld',
        ],
        cookieName: 'locale',
        csp: {
            enabled: true,
            policy: [
                {
                    'img-src': '\'self\' http:',
                },
                'block-all-mixed-content',
            ],
        },
        p3p: {
            enabled: isProduction(),
            value: '',
        },
        hsts: {
            enabled: true,
            maxAge: 31536000,
            includeSubDomains: true,
        },
        xframe: {
            enabled: true,
            value: 'SAMEORIGIN',
        },
        xss: {
            enabled: true,
            mode: 'block',
        },
        cors: {
            enabled: true,
        },
        ip: {
            enabled: false,
            whiteList: [],
            blackList: [],
        },
    },
    session: {
        enabled: true,
        client: 'cookie',
        key: 'strapi.sid',
        prefix: 'strapi:sess:',
        secretKeys: ['mySecretKey1', 'mySecretKey2'],
        httpOnly: true,
        maxAge: 86400000,
        overwrite: true,
        signed: false,
        rolling: false,
    },
    logger: {
        level: isProduction() ? 'info' : 'debug',
        exposeInContext: true,
        requests: !isProduction(),
    },
    parser: {
        enabled: true,
        multipart: true,
    },
    gzip: {
        enabled: isProduction(),
    },
    responseTime: {
        enabled: false,
    },
    poweredBy: {
        enabled: false,
    },
};
