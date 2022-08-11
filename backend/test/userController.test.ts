import request from 'supertest';
import app from '../src/app';
import { userService } from '../src/services/userService';

describe('POST /api/user/register', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  it('Error code 400 when neither username or password is provided', async () => {
    //Arrange
    //Act
    const result = await request(app).post('/api/user/register').send({});

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when password is not provided', async () => {
    //Arrange
    //Act
    const result = await request(app)
      .post('/api/user/register')
      .send({ username: 'userName' });

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when username is not provided', async () => {
    //Arrange
    //Act
    const result = await request(app)
      .post('/api/user/register')
      .send({ password: 'password123' });

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when password is less than 8 characters long', async () => {
    //Arrange
    //Act
    const result = await request(app).post('/api/user/register').send({
      username: 'puppy',
      password: '1234567',
    });

    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('registration is done', async () => {
    //Arrange
    const requestData = {
      username: 'puppy',
      password: '12345678',
    };

    userService.register = jest.fn();

    //Act
    const result = await request(app)
      .post('/api/user/register')
      .send(requestData);

    //Assert
    expect(result.statusCode).toEqual(201);
  });
});
