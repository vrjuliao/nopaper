const request = require('supertest');
const app = require('../server');
const User = require('../models/userModel');

const { setupDatabase, token, userOne, notebookOne, noteOne } = require('./fixtures/db');
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

  // Teste normal [matheus]
  test('Should create note',async () => {
    const response = await request(app).post('/note/new').send({
        title: 'titulo',
        markdown: 'asdasd',
        notebookId: notebookOne._id,
        
    }).set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('x-access-token', token).expect(200);
  
    expect(response.text).toBe('Nota criada com sucesso!');
  });

  // Teste com moc na variável 'noteOne' [matheus]
  test('Should delete note',async () => {
    const response = await request(app).delete('/note/delete').query({
        noteId: (noteOne._id).toString(),
        notebookId: (notebookOne._id).toString()
    }).set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('x-access-token', token).expect(200);
  
    expect(response.text).toBe('Nota deletada com sucesso!');
  });

  // Teste normal [matheus]
  test('Should update note',async () => {
    const response = await request(app).put('/note/update').send({
        noteId: noteOne._id,
        title: 'novo_titulo',
        markdown: 'novo',
        notebookId: notebookOne._id,
        
    }).set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('x-access-token', token).expect(200);
  
    expect(response.text).toBe('Nota atualizada com sucesso!');
  });

  // Teste normal [matheus]
  test('Should not update note',async () => {
    const response = await request(app).put('/note/update').send({
        noteId: '',
        title: 'novo_titulo',
        markdown: 'novo',
        notebookId: (notebookOne._id).toString(),
        
    }).set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .set('x-access-token', token).expect(400);
  
    expect(response.text).toBe('Note id inválido.');
  });
  