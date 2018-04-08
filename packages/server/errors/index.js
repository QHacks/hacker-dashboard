const ERROR_TEMPLATES = require('./templates');

module.exports = {
	ERROR_TEMPLATES,
	createError(errorTemplate, message, data = {}) {
		return Object.assign({}, errorTemplate, { message, data });
	}
};
