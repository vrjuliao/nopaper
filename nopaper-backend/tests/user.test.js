const request = require('supertest');
const app = require('../server');
const User = require('../models/userModel');

const { setupDatabase, token } = require('./fixtures/db');

beforeEach(setupDatabase);

// Teste normal
test('Should signup a new user', async () => {
  
  await request(app).post('/register').send({
    name: 'Luiz',
    email: 'luiz@example.com',
    pwd: 'MyPass777!',
    username: 'blablabalbla'
  }).set('Content-Type', 'application/json').set('Accept', 'application/json').expect(200);

});

// Teste normal
test('Should not signup a new user', async () => {
  
  await request(app).post('/register').send({
    name: 'Luiz',
    email: 'luiz@example.com',
    pwd: '',
    username: 'blablabalbla'
  }).set('Content-Type', 'application/json').set('Accept', 'application/json').expect(400);

});

// Teste mock (mock de usuário)
test('Should return one user with name Will', async () => {
  
  const response = await request(app).get('/users').set('Content-Type', 'application/json').set('Accept', 'application/json').set('x-access-token', token).expect(200);
  expect(response.body.length).toBe(1);
  expect(response.body[0].name).toBe('Will');

});

// Teste normal [starling]
test('Should not find valid user', async () => {
  const response = await request(app).post('/login').send({
    email: 'random@example.com',
    pwd: 'random',
  }).set('Content-Type', 'application/json').set('Accept', 'application/json').expect(400);
  expect(response.text).toBe('Usuário inválido!');
});

// Teste mock (mock de usuário) [starling]
test('Should not validate user', async () => {
  const response = await request(app).post('/login').send({
    email: 'will@example.com',
    pwd: 'wrongpwd',
  }).set('Content-Type', 'application/json').set('Accept', 'application/json').expect(400);
  expect(response.body.message).toBe('Login inválido!');
});