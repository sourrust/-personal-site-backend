'use strict';

const isString = require('./isString');

function hasForceQuery(context) {
    const { query } = context.request;

    return (
        isString(query.force) && (
            query.force === 'true' ||
            query.force.length === 0
        )
    );
}

module.exports = hasForceQuery;
