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
function withProject(query) {
    query.select(
        'id', 'name', 'slug', 'summary', 'description_html as description',
        'url', 'company'
    );

    query.orderBy('name');
}

function getCompany(slug) {
    const Company = strapi.query('company').model;

    return Company.where('slug', slug)
    .fetch({
        withRelated: [
            { projects: withProject }
        ]
    });
}

function getCompanies(limit) {
    const Company = strapi.query('company').model;

    return Company.collection()
    .orderBy('name')
    .query(function(query) {
        query.leftJoin('projects', 'companies.id', 'projects.company');
        query.groupBy('projects.company');
        query.count('projects.id as project_count');

        if (!isNil(limit)) {
            query.limit(limit);
        }
    })
    .fetch({ columns: ['companies.name', 'companies.slug', 'companies.url'] });
}

module.exports = {
    find: async function(context) {
        const { _limit } = context.query;

        let hitCache = true;
        const key    = isNil(_limit)
            ? 'companies'
            : `companies:${_limit}`;

        if (hasForceQuery(context)) {
            await cache.del([key, `etag:${key}`]);
        }

        const statusCode = 200;
        const payload    = await cache.wrap(key, () => {
            hitCache = false;

            return getCompanies(_limit);
        });

        await setCacheHeaders(context, hitCache, key, payload);

        return { statusCode, payload };
    },

    findOne: async function(context) {
        const { slug } = context.params;

        let hitCache = true;
        const key    = `companies:${slug}`;

        if (hasForceQuery(context)) {
            await cache.del([key, `etag:${key}`]);
        }

        const statusCode = 200;
        const payload    = await cache.wrap(key, () => {
            hitCache = false;

            return getCompany(slug);
        });

        if (isNil(payload)) {
            return context.response.notFound(
                `The company with id "${slug}" couldn't be found.`
            );
        }

        await setCacheHeaders(context, hitCache, key, payload);

        return { statusCode, payload };
    }
};
