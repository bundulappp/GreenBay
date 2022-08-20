import request from 'supertest';
import app from '../../src/app';
import { GetAllSaleableItemViewModel } from '../../src/models/view/GetAllSaleableItemViewModel';
import { itemService } from '../../src/services/itemService';
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

describe('GET /api/item', () => {
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

  it('getAllSaleableItems and get 200 with proper object', async () => {
    //Arrange
    const expectedResponse: GetAllSaleableItemViewModel[] = [
      {
        id: 2,
        itemName: 'Iphone s6',
        description: 'fast',
        photoUrl:
          'https://www.pgs.hu/images/thumbs/huawei-p20-pro-dual-sim-purple-rozbalene-balenie-vykup-391390.jpg',
        price: 50,
        selable: 2,
        sellersName: 'UserName',
      },
      {
        id: 3,
        itemName: 'Alcatel s6',
        description: 'slow',
        photoUrl:
          'https://www.pgs.hu/images/thumbs/huawei-p20-pro-dual-sim-purple-rozbalene-balenie-vykup-391390.jpg',
        price: 50,
        selable: 1,
        sellersName: 'UserName2',
      },
    ];
    itemService.getAllSelableItems = jest
      .fn()
      .mockResolvedValue(expectedResponse);
    //Act
    const result = await request(app).get('/api/item').send(expectedResponse);
    //Assert
    expect(result.statusCode).toEqual(200);
  });
});
