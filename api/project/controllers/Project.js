'use strict';

const {
    cache,
    hasForceQuery,
    isNil,
    setCacheHeaders
} = require('../../../utility');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

function getProjects() {
    const Project = strapi.query('project').model;

    return Project.forge()
    .orderBy('name')
    .fetchAll({ columns: ['name', 'slug', 'summary'] });
}

function getProject(slug) {
    const Project = strapi.query('project').model;

    return Project.where('slug', slug)
    .fetch({ withRelated: 'company' });
}

module.exports = {
    find: async function(context) {
        let hitCache = true;
        const key    = 'projects';

        if (hasForceQuery(context)) {
            await cache.del([key, `etag:${key}`]);
        }

        const statusCode = 200;
        const payload    = await cache.wrap(key, () => {
            hitCache = false;

            return getProjects();
        });

        await setCacheHeaders(context, hitCache, key, payload);

        return { statusCode, payload };
    },

    findOne: async function(context) {
        const { slug } = context.params;

        let hitCache = true;
        const key    = `projects:${slug}`;

        if (hasForceQuery(context)) {
            await cache.del([key, `etag:${key}`]);
        }

        const statusCode = 200;
        const payload    = await cache.wrap(key, () => {
            hitCache = false;

            return getProject(slug);
        });

        if (isNil(payload)) {
            return context.response.notFound(
                `The project with id "${slug}" couldn't be found.`
            );
        }

        await setCacheHeaders(context, hitCache, key, payload);

        return { statusCode, payload };
    }
};
