const nock = require('nock');
const DevRant = require('../src');

describe('/avatars', () => {
	let client = null;

	beforeEach(() => {
		client = new DevRant();
	});

	test('build an avatar', () => {
        nock('https://www.devrant.com/api')
            .get('/devrant/avatars/build')
            .query(true)
            .replyWithFile(200, __dirname + '/fixtures/avatars/build.json');

	    return client.avatars.build({app: 3, option: 'g'}).then(response => {
	        expect(typeof response === 'object').toBeTruthy();
	    });
	});
});