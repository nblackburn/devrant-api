const nock = require('nock');
const DevRant = require('../src');

describe('/users', () => {
    let client = null;

    beforeEach(() => {
        client = new DevRant();
    });

    test('get a single user', () => {
        nock('https://www.devrant.com/api')
            .get('/users/1150')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/users/single.json');

        return client.users.get(1150, {app: 3}).then(response => {
            expect(typeof response === 'object').toBeTruthy();
        });
    });

    test('edit the currently authenticated user', () => {
        nock('https://www.devrant.com/api')
            .post('/users/me/edit-profile')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/users/single.json');

        return client.users.edit({app: 3, profile_about: 'I am a robot'}).then(response => {
            expect(response).toBeTruthy();
        });
    });

    test('authenticate a user', () => {
        nock('https://www.devrant.com/api')
            .post('/users/auth-token')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/users/auth-token.json');

        return client.users.auth({username: 'username', password: 'password', app: 3}).then(response => {
            expect(typeof response === 'object').toBeTruthy();
        });
    });

    test('get the authenticated users notifications', () => {
        nock('https://www.devrant.com/api')
            .get('/users/me/notif-feed')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/users/notif-feed.json');

        return client.users.notifs({app: 3}).then(response => {
            expect(typeof response === 'object').toBeTruthy();
        });
    });

    test('set the authenticated users avatar', () => {
        nock('https://www.devrant.com/api')
            .post('/users/me/avatar')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/users/avatar.json');

        return client.users.avatar({app: 3, image_id: 'https://avatars.devrant.io/v-8_c-2_b-1_g-m_9-1_1-1_16-1_3-1_8-1_7-1_5-1_12-1_6-1_2-1_4-1.png'}).then(response => {
            expect(response).toBe(true);
        });
    });

    test('subscribe to a user', () => {
        nock('https://www.devrant.com/api')
            .post('/users/1150/subscribe')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/users/subscribe.json');

        return client.users.subscribe(1150, {app: 3}).then(response => {
            expect(response).toBe(true);
        });
    });

    test('unsubscribe from a user', () => {
        nock('https://www.devrant.com/api')
            .delete('/users/1150/subscribe')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/users/unsubscribe.json');

        return client.users.unsubscribe(1150, {app: 3}).then(response => {
            expect(response).toBe(true);
        });
    });
});