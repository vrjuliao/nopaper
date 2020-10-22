const request = require('supertest');
const app = require('../server');
const User = require('../models/userModel');

const { setupDatabase, token, userOne } = require('./fixtures/db');

beforeEach(setupDatabase);

  // Teste normal [starling]
test('Should not create note',async () => {
    const response = await request(app).post('/note/new').send({
        title: 'titulo',
        markdown: ''
    }).set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('x-access-token', token).expect(400);
  
    expect(response.text).toBe('Requisição invalida.');
  });

  // Teste normal [starling]
  test('Should not delete note',async () => {
    const response = await request(app).delete('/note/delete').query({
        noteId: null
    }).set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('x-access-token', token).expect(400);
  
    expect(response.text).toBe('Note id inválido.');
  });