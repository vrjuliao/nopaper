const request = require('supertest');
const app = require('../server');
const User = require('../models/userModel');

const { setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should signup a new user', async () => {
  
  await request(app).post('/register').send({
    name: 'Luiz',
    email: 'luiz@example.com',
    pwd: 'MyPass777!',
    username: 'blablabalbla'
  }).set('Content-Type', 'application/json').set('Accept', 'application/json').expect(200);

});
