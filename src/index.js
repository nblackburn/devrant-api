const qs = require('qs');
const axios = require('axios');
const RantsEndpoint = require('./endpoints/rants');
const UsersEndpoint = require('./endpoints/users');
const AvatarsEndpoint = require('./endpoints/avatars');

/**
 */
class DevRant {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://www.devrant.com/api',
        });

        this.rants = new RantsEndpoint(this.api);
        this.users = new UsersEndpoint(this.api);
        this.avatars = new AvatarsEndpoint(this.api);
    }

    /**
     * A hook to globally handle errors in requests.
     *
     * @param {Function} callback
     *
     * @return {Promise}
     */
    onError(callback) {
        this.api.interceptors.response.use(response => {
            return response;
        }, callback);
    }

    /**
     * A hook fired before each request.
     *
     * @param {Function} callback
     *
     * @return {Promise}
     */
    beforeEach(callback) {
        this.api.interceptors.request.use(callback, error => {
            return Promise.reject(error);
        });
    }

    /**
     * A hook fired after each request.
     *
     * @param {Function} callback
     *
     * @return {Promise}
     */
    afterEach(callback) {
        this.api.interceptors.response.use(callback, error => {
            return Promise.reject(error);
        });
    }

    /**
     * Search for a particular term.
     *
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    search(parameters) {
        return this.api
            .get('devrant/search', qs.stringify(parameters))
            .then(response => {
                return response.data.results;
            });
    }

    /**
     * Search for tags.
     *
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    searchTags(parameters) {
        return this.api
            .get('devrant/search/tags', qs.stringify(parameters))
            .then(response => {
                return response.data.tags;
            });
    }

    /**
     * Get the rants of the week.
     *
     * @return {Promise}
     */
    weeklyRants(parameters) {
        return this.api
            .get('devrant/weekly-rants', qs.stringify(parameters))
            .then(response => {
                return response.data.rants;
            });
    }

    /**
     * Get the story rants.
     *
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    storyRants(parameters) {
        return this.api
            .get('devrant/story-rants', qs.stringify(parameters))
            .then(response => {
                return response.data.rants;
            });
    }

    /**
     * Get the list of weekly questions.
     *
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    weeklyList(parameters) {
        return this.api
            .get('devrant/weekly-list', qs.stringify(parameters))
            .then(response => {
                return response.data.weeks;
            });
    }

    /**
     * Get the list of collabs.
     *
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    collabs(parameters) {
        return this.api
            .get('devrant/collabs', qs.stringify(parameters))
            .then(response => {
                return response.data.rants;
            });
    }

    /**
     * Get the list of rant discussions.
     *
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    rantDiscussions(parameters) {
        return this.api
            .get('devrant/rant-discussions', qs.stringify(parameters))
            .then(response => {
                return response.data.rants;
            });
    }

    /**
     * Get the list of devRant supporters.
     *
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    supporters(parameters) {
        return this.api
            .get('devrant/supporters', qs.stringify(parameters))
            .then(response => {
                return response.data.items;
            });
    }
}

module.exports = DevRant;
