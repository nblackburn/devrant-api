const qs = require('qs');
const Endpoint = require('./endpoint');

/**
 */
class Rants extends Endpoint {
    /**
     * Get a single rant.
     *
     * @param {Number} rant
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    single (rant, parameters) {
        return this.api.get(`devrant/rants/${rant}`, qs.stringify(parameters)).then(response => {
            return response.data.rant;
        });
    }

    /**
     * Get a list of all rants.
     *
     * @param {Object} parameters
     * 
     * @return {Promise}
     */
    all (parameters) {
        return this.api.get('devrant/rants', qs.stringify(parameters)).then(response => {
            return response.data.rants;
        });
    }

    /**
     * Get a surprise (random) rant.
     *
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    surprise (parameters) {
        return this.api.get('devrant/rants/surprise', qs.stringify(parameters)).then(response => {
            return response.data.rant;
        });
    }

    /**
     * Post a comment on a rant.
     * 
     * @param {Number} rant
     * @param {Object} parameters
     * 
     * @return {Promise}
     */
    comment (rant, parameters) {
        return this.api.post(`devrant/rants/${rant}/comments`, qs.stringify(parameters)).then(response => {
            return response.data.success;
        });
    }

    /**
     * Vote on a rant.
     * 
     * @param {Number} rant
     * @param {Object} parameters
     * 
     * @return {Promise}
     */
    vote (rant, parameters) {
        return this.api.post(`devrant/rants/${rant}/vote`, qs.stringify(parameters)).then(response => {
            return response.data.success;
        });
    }

    /**
     * Favorite a rant.
     * 
     * @param {Number} rant
     * @param {Object} parameters
     * 
     * @return {Promise}
     */
    favorite (rant, parameters) {
        return this.api.post(`devrant/rants/${rant}/favorite`, qs.stringify(parameters)).then(response => {
            return response.data.success;
        });
    }

    /**
     * Unfavorite a rant.
     * 
     * @param {Number} rant
     * @param {Object} parameters
     * 
     * @return {Promise}
     */
    unfavorite (rant, parameters) {
        return this.api.post(`devrant/rants/${rant}/unfavorite`, qs.stringify(parameters)).then(response => {
            return response.data.success;
        });
    }
};

module.exports = Rants;
