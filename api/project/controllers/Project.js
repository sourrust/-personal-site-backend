'use strict';

const isNil = require('../../../utility/isNil');

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
        const statusCode = 200;
        const payload    = await getProjects();

        return { statusCode, payload };
    },

    findOne: async function(context) {
        const { slug } = context.params;

        const statusCode = 200;
        const payload    = await getProject(slug);

        if (isNil(payload)) {
            return context.response.notFound(
                `The project with id "${slug}" couldn't be found.`
            );
        }

        return { statusCode, payload };
    }
};
