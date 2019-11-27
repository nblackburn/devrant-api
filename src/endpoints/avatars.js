const qs = require('qs');
const Endpoint = require('./endpoint');

/**
 */
class Avatar extends Endpoint {
    /**
     * Build an avatar.
     *
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    build(parameters) {
        return this.api
            .get('devrant/avatars/build', qs.stringify(parameters))
            .then(response => {
                return response.data.avatars;
            });
    }
}

module.exports = Avatar;
