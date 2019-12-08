'use strict';

const asMilliseconds  = require('./asMilliseconds');
const asSeconds       = require('./asSeconds');
const cache           = require('./cache');
const createETag      = require('./createETag');
const createSlug      = require('./createSlug');
const hasForceQuery   = require('./hasForceQuery');
const isNil           = require('./isNil');
const isNumber        = require('./isNumber');
const isString        = require('./isString');
const markdownToHtml  = require('./markdownToHtml');
const setCacheHeaders = require('./setCacheHeaders');

module.exports = {
    asMilliseconds,
    asSeconds,
    cache,
    createETag,
    createSlug,
    hasForceQuery,
    isNil,
    isNumber,
    isString,
    markdownToHtml,
    setCacheHeaders
};
