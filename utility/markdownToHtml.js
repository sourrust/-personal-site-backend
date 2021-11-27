'use strict';

const { marked } = require('marked');

const lineBreakRegExp = /\r?\n/g;

function removeLineBreaks(value) {
    return value.replace(lineBreakRegExp, '');
}

function markdownToHtml(markdown) {
    const html = marked(markdown);

    return removeLineBreaks(html);
}

module.exports = markdownToHtml;
