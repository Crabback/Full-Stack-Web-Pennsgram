const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../dbFunctions');
const { webapp, server} = require('../server');

describe('GET endpoint integration test', () => {

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

describe('PUT endpoint integration test', () => {
    test('Get userlist', async () => {
        const resp = await request(webapp).put('/userlist').send({usernames : ['obama','trump']});
        expect(resp.statusCode).toEqual(200);
    });

    test('Handles follow and unfollow', async () => {
        const resp1 = await request(webapp).put('/user/unfollow')
        .send({username1 : 'trump', username2 :'curry'});
        expect(resp1.statusCode).toEqual(200);

        const resp2 = await request(webapp).put('/user/follow')
        .send({username1 : 'trump', username2 :'curry'});
        expect(resp2.statusCode).toEqual(200);
    });

    test('Handles post update', async () => {
        const resp = await request(webapp).put('/post/1')
        .send({newImage : '', newDescription :'test'});
        expect(resp.statusCode).toEqual(200);
    });

    test('Handles like and unlike post', async () => {

        const resp1 = await request(webapp).put('/post/1/unlike')
        .send({username : 'trump'});
        expect(resp1.statusCode).toEqual(200);

        const resp = await request(webapp).put('/post/1/like')
        .send({username : 'trump'});
        expect(resp.statusCode).toEqual(200);
    });
});

describe('POST and DELETE endpoint integration test', () => {
    test('Create new user with incorrect format', async () => {

        const resp1 = await request(webapp).post('/user')
        .send({userObject : { 
            username : "testAPI",
            password : "123"
        }});
        expect(resp1.statusCode).toEqual(404);

    });

    test('Create new post and delete ', async () => {

        const resp1 = await request(webapp).post('/post/')
        .send({
            username : "tester",
            postObject : { 
            author : "tiger",
            image : "123",
            description : "test post",
            id : 1996
        }});
        expect(resp1.statusCode).toEqual(200);
        const resp2 = await request(webapp).delete('/post/1996');
        expect(resp2.statusCode).toEqual(200);
    });

    test('Create new comment and delete', async () => {
        const resp1 = await request(webapp).post('/post/1/comments')
        .send({
            commentObject : { 
            author : "tiger",
            comment : "mention test",
            mention : "@[elon](elon)",
        }});
        expect(resp1.statusCode).toEqual(200);

        const resp2 = await request(webapp).delete('/post/1/comments')
        .send({
            author : "tiger",
            content : "mention test"
        });
        expect(resp2.statusCode).toEqual(200);    
    })

});