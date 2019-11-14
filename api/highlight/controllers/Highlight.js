'use strict';

const isNil = require('../../../utility/isNil');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
function getHighlights() {
    const Highlight = strapi.query('highlight').model;

    return Highlight.forge()
    .orderBy('id')
    .fetchAll({ columns: ['name', 'slug', 'description'] });
}

function getHighlight(slug) {
    const Highlight = strapi.query('highlight').model;

    return Highlight.where('slug', slug)
    .fetch();
}

module.exports = {
    find: async function(context) {
        const statusCode = 200;
        const payload    = await getHighlights();

        return { statusCode, payload };
    },

    findOne: async function(context) {
        const { slug } = context.params;

        const statusCode = 200;
        const payload    = await getHighlight(slug);

        if (isNil(payload)) {
            return context.response.notFound(
                `The highlight with id "${slug}" couldn't be found.`
            );
        }

        return { statusCode, payload };
    }
};
