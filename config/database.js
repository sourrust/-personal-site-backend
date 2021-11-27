'use strict';

function getDevelopmentConfig(env) {
    return {
        defaultConnection: 'default',
        connections: {
            default: {
                connector: 'bookshelf',
                settings: {
                    client: 'sqlite',
                    filename: env('DATABASE_FILENAME', '.tmp/data.db'),
                },
                options: {
                    useNullAsDefault: true,
                },
            },
        },
    };
}

function getProductionConfig(env) {
    return {
        defaultConnection: 'default',
        connections: {
            default: {
                connector: 'bookshelf',
                settings: {
                    client: 'mysql',
                    host: env.int('DATABASE_HOST', '127.0.0.1'),
                    port: env('DATABASE_PORT', 27017),
                    database: env('DATABASE_NAME', 'personal_site'),
                    username: env('DATABASE_USERNAME', ''),
                    password: env('DATABASE_PASSWORD', ''),
                    ssl: false,
                },
                options: {
                    authenticationDatabase: env('DATABASE_AUTHENTICATION_DATABASE', ''),
                },
            },
        },
    };
}

function getStagingConfig(env) {
    return {
        defaultConnection: 'default',
        connections: {
            default: {
                connector: 'bookshelf',
                settings: {
                    client: 'mysql',
                    host: env('DATABASE_HOST', '127.0.0.1'),
                    port: env.int('DATABASE_PORT', 27017),
                    database: env('DATABASE_NAME', 'personal_site'),
                    username: env('DATABASE_USERNAME', ''),
                    password: env('DATABASE_PASSWORD', ''),
                    ssl: false,
                },
                options: {
                    authenticationDatabase: env('DATABASE_AUTHENTICATION_DATABASE', ''),
                },
            },
        },
    };
}

function configuration({ env }) {
    const nodeEnv = env('NODE_ENV', 'development');

    switch (nodeEnv) {
        case 'production':
            return getProductionConfig(env);
        case 'staging':
            return getStagingConfig(env);
        default:
            return getDevelopmentConfig(env);
    }
}

module.exports = configuration;
