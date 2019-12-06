'use strict';

const crypto = require('crypto');

function createETag(entity) {
    // Pregenerated empty string etag
    if (entity.length === 0) {
        return '"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk"';
    }

    const hash = crypto
        .createHash('sha1')
        .update(entity, 'utf8')
        .digest('base64')
        .substring(0, 27);

    const length = Buffer.byteLength(entity, 'utf8');

    return `"${length.toString(16)}-${hash}"`;
}

module.exports = createETag;
