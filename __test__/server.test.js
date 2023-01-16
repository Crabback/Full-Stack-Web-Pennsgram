const request = require('supertest');
//const { closeMongoDBConnection, connect } = require('../dbFunctions');
const {webapp} = require('../server');
const dbLib = require('../dbFunctions'); 
const url = process.env.URL;

let db;
let token;

beforeAll(async () =>{
    db = await dbLib.connect(url);
    const resp = await request(webapp).post('/api/login').send({username: "yuchenwang", password: "yuchenwang123"}); // login as yuchenwang to get the token
    console.log("login resp: ", resp._body);
    token = resp._body.token;
});

describe('GET endpoint integration test', () => {

    // create the three test users first 
    beforeEach(async () => {

    });
    
    test('Get all users endpoint status code and data', () => {
        request(webapp)
        .get('/api/users')
        .expect(200);
    });

    test('Get one user endpoint status code and data', async () => {
        const resp = await request(webapp).get('/api/user/obama'); // don't need token to do so
        expect(resp.statusCode).toEqual(200);
    });

    test('Get user latest', async () => {
        const latestPostOfYuen = {
            _id: '638ac345d8f0f2d83c577fdf',
            id: 38,
            author: 'yuchenwang',
            description: 'I love Philadelphia.',
            date: '10/1/2022',
            image: 'https://www.discoverphl.com/wp-content/uploads/2021/07/Philadelphia-Museum-of-Art-and-skyline.-Photo-by-Elevated-Angles-1.jpg',
            likes: [],
            comments: [],
            private: false,
            avatar: 'https://movies-b26f.kxcdn.com/wp-content/uploads/2019/08/ultraman-770x470.jpg'
          }
  
        const resp = await request(webapp).get('/api/user/yuchenwang/latest').set("authorization", token); // pass the token to the request headers 
        expect(resp.statusCode).toEqual(200);  
        const postReceived = resp._body.data;
        expect(postReceived.author).toEqual("yuchenwang");
    });

    test('Get all posts', async () => {
        const resp = await request(webapp).get('/api/posts');
        expect(resp.statusCode).toEqual(200);
    });

    test('Get single posts', async () => {
        const resp = await request(webapp).get('/api/post/1');
        expect(resp.statusCode).toEqual(200);
    });

    test('Get comments from post', async () => {
        const resp = await request(webapp).get('/api/post/1/comments');
        expect(resp.statusCode).toEqual(200);
    });
});

describe('PUT endpoint integration test', () => {
    test('Get userlist', async () => {
        const resp = await request(webapp).put('/api/userlist').send({usernames : ['obama','trump']}).set("authorization", token);
        expect(resp.statusCode).toEqual(200); 
        const objectListGot = resp._body.data;
        const usernameList = objectListGot.map((o)=> o.username);
        expect(usernameList.includes('obama')).toEqual(true);
        expect(usernameList.includes('trump')).toEqual(true);
    });

    test('Handles follow and unfollow', async () => {
        const resp1 = await request(webapp).put('/api/user/unfollow')
        .send({username1 : 'yuchenwang', username2 :'curry'}).set("authorization", token); // pass the token to the request headers ;
        expect(resp1.statusCode).toEqual(200); 

        const resp2 = await request(webapp).put('/api/user/follow')
        .send({username1 : 'trump', username2 :'curry'}).set("authorization", token); // pass the token to the request headers ;
        expect(resp2.statusCode).toEqual(200);
    });

    test('Handles post update', async () => {
        const resp = await request(webapp).put('/api/post/38')
        // changing the description of the post 
        .send({newImage : 'https://www.discoverphl.com/wp-content/uploads/2021/07/Philadelphia-Museum-of-Art-and-skyline.-Photo-by-Elevated-Angles-1.jpg'
        , newDescription :'updated: I love philly.'}).set("authorization", token); // pass the token to the request headers ;
        expect(resp.statusCode).toEqual(200); 

        const backRes = await request(webapp).put('/api/post/38')
        .send({newImage : 'https://www.discoverphl.com/wp-content/uploads/2021/07/Philadelphia-Museum-of-Art-and-skyline.-Photo-by-Elevated-Angles-1.jpg'
        , newDescription :'I love Philadelphia.'}).set("authorization", token); // pass the token to the request headers ;
    });

    test('Handles like and unlike post', async () => {

        const resp1 = await request(webapp).put('/api/post/1/unlike')
        .send({username : 'trump'}).set("authorization", token); // pass the token to the request headers ;;
        expect(resp1.statusCode).toEqual(200); ////

        const resp = await request(webapp).put('/api/post/1/like')
        .send({username : 'trump'}).set("authorization", token); // pass the token to the request headers ;;
        expect(resp.statusCode).toEqual(200);
    });
});

describe('POST and DELETE endpoint integration test', () => {
    test('Create new user with incorrect format', async () => {

        const resp1 = await request(webapp).post('/api/user')
        .send({userObject : { 
            username : "testAPI",
            password : "123"
        }});
        expect(resp1.statusCode).toEqual(200);
    });

    test('Create new post and delete ', async () => {

        const resp1 = await request(webapp).post('/api/post/')
        .send({
            username : "yuchenwang",
            postObject : { 
            author : "yuchenwang",
            image : "123",
            description : "test post",
            id : 1996
        }}).set("authorization", token); // pass the token to the request headers;
        expect(resp1.statusCode).toEqual(200); 
        const resp2 = await request(webapp).delete('/api/post/1996').set("authorization", token); // pass the token to the request headers ;
        expect(resp2.statusCode).toEqual(200);
    });

    test('Create new comment and delete', async () => {
        const resp1 = await request(webapp).post('/api/post/1/comments')
        .send({
            commentObject : { 
            author : "yuchenwang",
            comment : "Hello! follow me.",
            mention : "@[elon](elon)",
        }}).set("authorization", token); // pass the token to the request headers ;
        expect(resp1.statusCode).toEqual(200); ////

        const resp2 = await request(webapp).delete('/api/post/1/comments')
        .send({
            author : "yuchenwang",
            content : "Hello! follow me."
        }).set("authorization", token); // pass the token to the request headers ;
        expect(resp2.statusCode).toEqual(200);    
    })

});