const request = require('supertest');
const app = require('../server');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const { setupDatabase, userOne} = require('./fixtures/db');

beforeEach(setupDatabase);

// Mock para a geração do webtoken [vinicius]
test('Should generate a token with "blablabla"', async () => {
    
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
//  usando o id do usuário como payload do token [vinicius]
test('Should decode correctly the generated webtoken', async () => {
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

//Teste de integração com mongoose, UserSchema 
// criação e armazenamento corretos de usuario [starling]
test('Should create & save user successfully', async () => {
  const userData = {email: 'mail@adress.com', username: 'myUsername', name: 'myNabe', pwd: '1234', favorites: []}
  const validUser = new User(userData);
  const savedUser = await validUser.save();
  // Object Id deve ser defino quando armazenado no MongoDB.
  expect(savedUser._id).toBeDefined();
  expect(savedUser.name).toBe(userData.name);
  expect(savedUser.gender).toBe(userData.gender);
  expect(savedUser.dob).toBe(userData.dob);
  expect(savedUser.loginUsing).toBe(userData.loginUsing);
});
