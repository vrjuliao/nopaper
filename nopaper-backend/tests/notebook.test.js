const request = require('supertest');
const app = require('../server');
const User = require('../models/userModel');

const { setupDatabase, token, userOne, notebookOne, notebookTwo } = require('./fixtures/db');

beforeEach(setupDatabase);

// Teste normal
test('Should create a new notebook', async () => {
  
  await request(app).post('/notebook/new').send({
    name: 'req.body.name',
    description: 'req.body.description'
  }).set('Content-Type', 'application/json').set('Accept', 'application/json').set('x-access-token', token).expect(200);

});

// Teste normal
test('Should not create a new notebook', async () => {
  
  await request(app).post('/notebook/new').send({
    name: '',
    description: 'req.body.description'
  }).set('Content-Type', 'application/json').set('Accept', 'application/json').set('x-access-token', token).expect(501);

});

// Teste normal
test('Should delete a notebook', async () => {
  
  await request(app).delete(`/notebook/delete/?id=${notebookOne._id}`).send()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .set('x-access-token', token)
  .expect(200);

});

// Teste normal
test('Should not delete a notebook, wrong user', async () => {
  
  await request(app).delete(`/notebook/delete/?id=${notebookTwo._id}`).send()
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .set('x-access-token', token)
  .expect(403);

});

// Teste normal
test('Should clone a notebook', async () => {
  
  await request(app).post('/notebook/clone')
  .send({
    id: notebookTwo._id
  })
  .set('Content-Type', 'application/json')
  .set('Accept', 'application/json')
  .set('x-access-token', token)
  .expect(200);

});
