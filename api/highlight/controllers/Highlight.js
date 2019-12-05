'use strict';

const { cache, isNil } = require('../../../utility');

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
        let hitCache = true;
        const key    = 'highlights';

        const statusCode = 200;
        const payload    = await cache.wrap(key, () => {
            hitCache = false;

            return getHighlights();
        });

        return { statusCode, payload };
    },

    findOne: async function(context) {
        const { slug } = context.params;

        let hitCache = true;
        const key    = `highlights:${slug}`;

        const statusCode = 200;
        const payload    = await cache.wrap(key, () => {
            hitCache = false;

            return getHighlight(slug);
        });

        if (isNil(payload)) {
            return context.response.notFound(
                `The highlight with id "${slug}" couldn't be found.`
            );
        }

        return { statusCode, payload };
    }
};
