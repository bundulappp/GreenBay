import request from 'supertest';
import app from '../../src/app';
import { jwtService } from '../../src/services/jwtService';

describe('Post /api/item', () => {
  const token = 'Bearer asdaslkp212';
  const tokenData = {
    userId: 1,
  };
  beforeEach(() => {
    jwtService.getTokenFromRequest = jest.fn().mockReturnValue(token);
    jwtService.verifyToken = jest.fn().mockReturnValue(true);
    jwtService.getTokenPayload = jest.fn().mockReturnValue(tokenData);
    console.error = jest.fn();
  });

  it('Error code 400 when some data from form is missing', async () => {
    //Arrange
    //Act
    const result = await request(app).post('/api/item').send({
      name: 'phone',
      description: '',
      photoUrl: 'https://hu.wikipedia.org/wiki/Macska',
      price: 1200,
    });
    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when url is not valid', async () => {
    //Arrange
    //Act
    const result = await request(app).post('/api/item').send({
      name: 'phone',
      description: 'catPhone',
      photoUrl: 'wikipedia.org/wiki/Macska',
      price: 1200,
    });
    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Error code 400 when price is not a positive whole number', async () => {
    //Arrange
    //Act
    const result = await request(app).post('/api/item').send({
      name: 'phone',
      description: 'catPhone',
      photoUrl: 'wikipedia.org/wiki/Macska',
      price: -1.23,
    });
    //Assert
    expect(result.statusCode).toEqual(400);
  });

  it('Status code 201 when item is created', async () => {
    //Arrange
    //Act
    const result = await request(app).post('/api/item').send({
      name: 'phone',
      description: 'Huawei P20 pro',
      photoUrl: 'https://hu.wikipedia.org/wiki/Macska',
      price: 1200,
    });
    //Assert
    expect(result.statusCode).toEqual(201);
  });
});
