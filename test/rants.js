const nock = require('nock');
const DevRant = require('../source');

describe('/rants', () => {
    let client = null;

    beforeEach(() => {
        client = new DevRant();
    });

    test('get a single rant', () => {
        nock('https://www.devrant.com/api')
            .get('/devrant/rants/33434')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/rants/single.json');

        return client.rants.single(33434, {app: 3}).then(response => {
            expect(typeof response === 'object').toBeTruthy();
        });
    });

    test('get a list of rants', () => {
        nock('https://www.devrant.com/api')
            .get('/devrant/rants')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/rants/all.json');

        return client.rants.all({app: 3}).then(response => {
            expect(response.length > 0).toBeTruthy();
        });
    });

    test('get a surprise rant', () => {
        nock('https://www.devrant.com/api')
            .get('/devrant/rants/surprise')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/rants/surprise.json');

        return client.rants.surprise({app: 3}).then(response => {
            expect(typeof response === 'object').toBeTruthy();
        });
    });

    test('comment on a rant', () => {
        nock('https://www.devrant.com/api')
            .post('/devrant/rants/143708/comments')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/rants/comment.json');

        return client.rants.comment(143708, {app: 3, comment: 'The cake is always a lie.'}).then(response => {
            expect(response).toBeTruthy();
        });
    });

    test('vote on a rant', () => {
        nock('https://www.devrant.com/api')
            .post('/devrant/rants/33434/vote')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/rants/vote.json');

        return client.rants.vote(33434, {app: 3, vote: 1}).then(response => {
            expect(response).toBeTruthy();
        });
    });

    test('favorite a rant', () => {
        nock('https://www.devrant.com/api')
            .post('/devrant/rants/33434/favorite')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/rants/favorite.json');

        return client.rants.favorite(33434, {app: 3}).then(response => {
            expect(response).toBeTruthy();
        });
    });

    test('unfavorite a rant', () => {
        nock('https://www.devrant.com/api')
            .post('/devrant/rants/33434/unfavorite')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/rants/unfavorite.json');

        return client.rants.unfavorite(33434, {app: 3}).then(response => {
            expect(response).toBeTruthy();
        });
    });
});