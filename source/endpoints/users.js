const qs = require('qs');
const Endpoint = require('./endpoint');

/**
 */
class Users extends Endpoint {
    /**
     * Get a single user.
     *
     * @param {Number} id
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    get (id, parameters) {
        return this.api.get(`users/${id}`, qs.stringify(parameters)).then(response => {
            return response.data.profile;
        });
    }

    /**
     * Edit the currently authenticated user.
     *
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    edit (parameters) {
        return this.api.post('users/me/edit-profile', qs.stringify(parameters)).then(response => {
            return response.data.success;
        });
    }

    /**
     * Authenticate a user.
     *
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    auth (parameters) {
        return this.api.post('users/auth-token', qs.stringify(parameters)).then(response => {
            return response.data.auth_token;
        });
    }

    /**
     * Get the authenticated users notifications.
     *
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    notifs (parameters) {
        return this.api('users/me/notif-feed', qs.stringify(parameters)).then(response => {
            return response.data.data;
        });
    }

    /**
     * Set the authenticated users avatar.
     *
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    avatar (parameters) {
        return this.api.post('users/me/avatar', qs.stringify(parameters)).then(response => {
            return response.data.success;
        });
    }

    /**
     * Subscribe to a user.
     *
     * @param {Number} user
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    subscribe (user, parameters) {
        return this.api.post(`users/${user}/subscribe`, qs.stringify(parameters)).then(response => {
            return response.data.success;
        });
    }

    /**
     * Unsubscribe to a user.
     *
     * @param {Number} user
     * @param {Object} parameters
     *
     * @return {Promise}
     */
    unsubscribe (user, parameters) {
        return this.api.delete(`users/${user}/subscribe`, qs.stringify(parameters)).then(response => {
            return response.data.success;
        });
    }
};

module.exports = Users;
