const { Done } = require('@mui/icons-material');
const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../dbFunctions');
const { webapp, server} = require('../server');

describe('GET student(s) endpoint integration test', () => {

    test('Get all users endpoint status code and data', () => {
        request(webapp)
        .get('/users')
        .expect(200);
    });

    test('Get one user endpoint status code and data', async () => {
        const resp = await request(webapp).get('/user/obama');
        expect(resp.statusCode).toEqual(200);
    });

    test('Get user latest', async () => {
        const resp = await request(webapp).get('/user/obama/latest');
        expect(resp.statusCode).toEqual(200);
    });

    test('Get all posts', async () => {
        const resp = await request(webapp).get('/posts');
        expect(resp.statusCode).toEqual(200);
    });

    test('Get single posts', async () => {
        const resp = await request(webapp).get('/post/1');
        expect(resp.statusCode).toEqual(200);
    });

    test('Get comments from post', async () => {
        const resp = await request(webapp).get('/post/1/comments');
        expect(resp.statusCode).toEqual(200);
    });

});