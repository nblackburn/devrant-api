const nock = require('nock');
const DevRant = require('../src');

describe('/', () => {
    let client = null;

    beforeEach(() => {
        client = new DevRant();
    });

    test('search for a term on devRant', () => {
        nock('https://www.devrant.com/api')
            .get('/devrant/search')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/search.json');

        return client.search({app: 3, term: 'php'}).then(response => {
            expect(response.length > 0).toBeTruthy();
        });
    });

    test('search for tag suggestions', () => {
        nock('https://www.devrant.com/api')
            .get('/devrant/search/tags')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/tags.json');

        return client.searchTags({app: 3, tag: 'php'}).then(response => {
            expect(response.length > 0).toBeTruthy();
        });
    });

    test('get the weekly rants', () => {
        nock('https://www.devrant.com/api')
            .get('/devrant/weekly-rants')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/weekly-rants.json');

        return client.weeklyRants({app: 3}).then(response => {
            expect(response.length > 0).toBeTruthy();
        });
    });

    test('get the story rants', () => {
        nock('https://www.devrant.com/api')
            .get('/devrant/story-rants')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/story-rants.json');

        return client.storyRants({app: 3}).then(response => {
            expect(response.length > 0).toBeTruthy();
        });
    });

    test('get the weekly list', () => {
        nock('https://www.devrant.com/api')
            .get('/devrant/weekly-list')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/weekly-list.json');

        return client.weeklyList({app: 3}).then(response => {
            expect(response.length > 0).toBeTruthy();
        });
    });

    test('get the list of collabs', () => {
        nock('https://www.devrant.com/api')
            .get('/devrant/collabs')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/collabs.json');

        return client.collabs({app: 3}).then(response => {
            expect(response.length > 0).toBeTruthy();
        });
    });

    test('get the list of rant discussions', () => {
        nock('https://www.devrant.com/api')
            .get('/devrant/rant-discussions')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/rant-discussions.json');

        return client.rantDiscussions({app: 3}).then(response => {
            expect(response.length > 0).toBeTruthy();
        });
    });

    test('get the list of devRant supporters', () => {
        nock('https://www.devrant.com/api')
            .get('/devrant/supporters')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/supporters.json');

        return client.supporters({app: 3}).then(response => {
            expect(response.length > 0).toBeTruthy();
        });
    });

    it('should be able to register a onError callback', () => {
        nock('https://www.devrant.com/api')
            .get('/devrant/rants/1')
            .query(true)
            .replyWithFile(404, __dirname + '/fixtures/rants/invalid.json');

        client.onError(error => {
            expect(error.response.status).toBe(404);

            return Promise.reject(error);
        });

        return client.rants.single(1).catch(error => {
            expect(error.response.status).toBe(404);
        });
    });

    it('should be able to register a beforeEach callback', () => {
        nock('https://www.devrant.com/api')
            .get('/devrant/rants')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/rants/all.json');

        client.beforeEach(config => {
            expect(typeof config).toBe('object');

            return config;
        });

        return client.rants.all().catch(error => {
            expect(error.response.status).toBe(200);
        });
    });

    it('should be able to register a afterEach callback', () => {
        nock('https://www.devrant.com/api')
            .get('/devrant/rants')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/rants/all.json');

        client.afterEach(response => {
            expect(typeof response).toBe('object');

            return response;
        });

        return client.rants.all().then(rants => {
            expect(typeof rants).toBe('object');
        });
    });
});