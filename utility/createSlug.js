'use strict';

const slugify = require('slugify');

function createSlug(name) {
    return slugify(name, { lower: true });
}

module.exports = createSlug;
