'use strict';

const asMilliseconds = require('./asMilliseconds');
const cache          = require('./cache');
const createSlug     = require('./createSlug');
const isNil          = require('./isNil');
const markdownToHtml = require('./markdownToHtml');

module.exports = {
    asMilliseconds,
    cache,
    createSlug,
    isNil,
    markdownToHtml
};
