'use strict';

const isNumber = require('lodash/isNumber');

function toMilliseconds(value) {
    return value / 1000;
}

function toMinutes(value) {
    return value * 60;
}

function toHours(value) {
    return toMinutes(value) * 60;
}

function toDays(value) {
    return toHours(value) * 24;
}

function asSeconds(value, initialUnit) {
    if (!isNumber(value)) {
        return 0;
    }

    const unit = (initialUnit || 'seconds').toLowerCase();

    switch (unit) {
        case 'days':
            return toDays(value);
        case 'hours':
            return toHours(value);
        case 'minutes':
            return toMinutes(value);
        case 'seconds':
            return value;
        case 'milliseconds':
            return toMilliseconds(value);
        default:
            return value;
    }
}

module.exports = asSeconds;
