'use strict';

const cache         = require('./cache');
const createETag    = require('./createETag');
const hasForceQuery = require('./hasForceQuery');

const DAY_OFFSET    = 60 * 60 * 24;
const HOUR_OFFSET   = 60 * 60;
const MINUTE_OFFSET = 60;

function formatTimeToLive(ttlSeconds) {
    let seconds   = ttlSeconds;
    const results = [];

    const days = Math.floor(seconds / DAY_OFFSET);

    if (days > 0) {
        results.push(`${days}d`);

        seconds -= days * DAY_OFFSET;
    }

    const hours = Math.floor(seconds / HOUR_OFFSET);

    if (hours > 0) {
        results.push(`${hours}h`);

        seconds -= hours * HOUR_OFFSET;
    }

    const minutes = Math.floor(seconds / MINUTE_OFFSET);

    if (minutes > 0) {
        results.push(`${minutes}m`);

        seconds -= minutes * MINUTE_OFFSET;
    }

    results.push(`${seconds}s`);

    return results.join(' ');
}

async function setCacheHeader(context, hitCache, key, payload) {
    const isForceRefresh = hasForceQuery(context);
    const remaining      = isForceRefresh ? 0 : await cache.ttl(key);

    const client = await cache.store.getClient();
    const maxAge = client.options.ttl;
    const etag   = await cache.wrap(`etag:${key}`, () => {
        const entity = JSON.stringify(payload);

        return createETag(entity);
    });

    const revalidate = isForceRefresh ? 0 : Math.ceil(remaining * 0.8);

    const cacheControl = (
        `public, must-revalidate, max-age=${maxAge}, s-max-age=${maxAge}, ` +
        `stale-while-revalidate=${revalidate}`
    );

    context.set({
        'Cache-Control': cacheControl,
        'X-Cache-Status': hitCache && !isForceRefresh ? 'HIT' : 'MISS',
        'X-Cache-Expired-At': formatTimeToLive(remaining),
        'ETag': etag
    });
}

module.exports = setCacheHeader;
