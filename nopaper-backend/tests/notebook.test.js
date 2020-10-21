const request = require('supertest');
const app = require('../server');
const User = require('../models/userModel');

const { setupDatabase, token, userOne } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create a new notebook', async () => {
  
  await request(app).post('/notebook/new').send({
    name: 'req.body.name',
    description: 'req.body.description'
  }).set('Content-Type', 'application/json').set('Accept', 'application/json').set('x-access-token', token).expect(200);

});
