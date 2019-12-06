'use strict';

const isNumber = require('lodash/isNumber');

function toSeconds(value) {
    return value * 1000;
}

function toMinutes(value) {
    return toSeconds(value) * 60;
}

function toHours(value) {
    return toMinutes(value) * 60;
}

function toDays(value) {
    return toHours(value) * 24;
}

function asMilliseconds(value, initialUnit) {
    if (!isNumber(value)) {
        return 0;
    }

    const unit = (initialUnit || 'milliseconds').toLowerCase();

    switch (unit) {
        case 'days':
            return toDays(value);
        case 'hours':
            return toHours(value);
        case 'minutes':
            return toMinutes(value);
        case 'seconds':
            return toSeconds(value);
        case 'milliseconds':
            return value;
        default:
            return value;
    }
}

module.exports = asMilliseconds;
