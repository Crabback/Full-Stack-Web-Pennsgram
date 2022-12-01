const request = require('supertest');
const { closeMongoDBConnection, connect } = require('../dbFunctions');
const { webapp, server} = require('../server');

describe('GET student(s) endpoint integration test', () => {

    test('Get all students endpoint status code and data', () => {
        request(webapp)
        .get('/users')
        .expect(200);
        server.close();
      });

});