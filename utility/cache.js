'use strict';

const cacheManager = require('cache-manager');
const redisStore   = require('cache-manager-ioredis');

const asSeconds = require('./asSeconds');

const redisCache = cacheManager.caching({
    store: redisStore,
    host: process.env.REDIS_HOST || 'localhost',
    password: `${process.env.REDIS_PASSWORD}`,
    db: parseInt(`${process.env.REDIS_DB_INDEX || '0'}`, 10),
    ttl: asSeconds(3, 'days')
});

module.exports = redisCache;
