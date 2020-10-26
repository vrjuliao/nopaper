const request = require('supertest');
const app = require('../server');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const { setupDatabase, userOne} = require('./fixtures/db');

beforeEach(setupDatabase);

// Mock para a geração do webtoken
test('Should signup a new user', async () => {
    
    // A função que gera um webtoken retorna a string "blablabla"
    const jwtSpy = jest.spyOn(jwt, 'sign');
    jwtSpy.mockReturnValue('blablabla');
    
    const res = await request(app).post('/login')
    .send(userOne)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json');
    expect(res.status).toBe(200);
    expect(res.body.token).toBe('blablabla');
    
    jwtSpy.mockRestore();
});

// Teste de integração para a geração correta do webtoken ...
//  usando o id do usuário como payload do token
test('Should signup a new user', async () => {
    console.log(userOne._id.toHexString())

    var token = jwt.sign({ userId: userOne._id }, process.env.SECRET, {
        expiresIn: 10800, // expires in 3h
      });

    var userID;
    jwt.verify(token, process.env.SECRET, 
      function (err, decoded) {
        userID = decoded.userId;
    });

    expect(userID).toBe(userOne._id.toHexString());
});
