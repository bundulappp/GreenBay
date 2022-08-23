import { UserDomainModel } from '../../src/models/domian/UserDomainModel';
import { AddNewItemRequestModel } from '../../src/models/request/AddNewItemRequestModel';
import { itemRepository } from '../../src/repositories/itemRepository';
import { userRepository } from '../../src/repositories/userRepository';
import {
  forbiddenError,
  notFoundError,
} from '../../src/services/generalErrorService';
import { itemService } from '../../src/services/itemService';

describe('itemService, add new item', () => {
  it('user not found', async () => {
    //Arrange
    const itemData: AddNewItemRequestModel = {
      itemName: 'Phone',
      description: 'iphone',
      photoUrl: 'https://hu.wikipedia.org/wiki/Macska',
      price: 1120,
      userId: 66,
    };

    userRepository.getUserById = jest.fn().mockResolvedValue(null);
    itemRepository.addNewItem = jest.fn();
    try {
      //Act
      const result = await itemService.addNewItem(itemData);
    } catch (error) {
      //Assert
      expect(userRepository.getUserById).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserById).toHaveBeenCalledWith(66);
      expect(error).toEqual(notFoundError('User not found with this id'));
    }
  });

  it('item added and send return the item id', async () => {
    //Arrange
    const itemData: AddNewItemRequestModel = {
      itemName: 'Phone',
      description: 'iphone',
      photoUrl: 'https://hu.wikipedia.org/wiki/Macska',
      price: 1120,
      userId: 66,
    };

    const userData: UserDomainModel = {
      id: 66,
      password: 'asasdaélkpőok',
      name: 'patrik',
      dollar: 100,
    };
    userRepository.getUserById = jest.fn().mockResolvedValue(userData);
    itemRepository.addNewItem = jest.fn().mockResolvedValue(1);
    //Act
    const result = await itemService.addNewItem(itemData);
    //Assert
    expect(userRepository.getUserById).toHaveBeenCalledTimes(1);
    expect(userRepository.getUserById).toHaveBeenCalledWith(itemData.userId);
    expect(itemRepository.addNewItem).toHaveBeenCalledTimes(1);
    expect(itemRepository.addNewItem).toHaveBeenCalledWith(
      itemData.itemName,
      itemData.description,
      itemData.photoUrl,
      itemData.price,
      itemData.userId,
    );
    expect(result).toEqual(1);
  });
});

describe('itemService, getItemData', () => {
  it('item not found and get a 404', async () => {
    //Arrange
    const itemId = 40;
    itemRepository.getItemById = jest.fn().mockResolvedValue(null);
    //Assert
    try {
      await itemService.getItemData(itemId);
    } catch (error) {
      //Act
      expect(itemRepository.getItemById).toHaveBeenCalledTimes(1);
      expect(itemRepository.getItemById).toHaveBeenCalledWith(itemId);
      expect(error).toStrictEqual(notFoundError('Item not found'));
    }
  });

  it('return the proper item object', async () => {
    //Arrange
    const itemId = 4;
    const itemData = {
      id: 4,
      itemName: 'cup',
      description: 'Coffee cup crafted in extra fine Limoges porcelain.',
      photoUrl:
        'https://media.dior.com/couture/ecommerce/media/catalog/product/j/V/1654594988_HYJ02CTJ0U_C510_E01_ZHC.jpg?imwidth=870',
      price: 150,
      selable: 2,
      sellersName: 'UserName1',
    };

    itemRepository.getItemById = jest.fn().mockResolvedValue(itemData);
    //Act
    const result = await itemService.getItemData(itemId);
    //Assert
    expect(itemRepository.getItemById).toHaveBeenCalledTimes(1);
    expect(itemRepository.getItemById).toHaveBeenCalledWith(itemId);
    expect(result).toBe(itemData);
  });
});

describe('itemService, setItemSalability', () => {
  it('item not found', async () => {
    //Arrange
    const itemId = 40;
    const userId = 1;
    itemRepository.getItemById = jest.fn().mockResolvedValue(null);
    userRepository.getUserById = jest.fn();
    itemRepository.setItemSalabilityToUnsaleable = jest.fn();
    itemRepository.setItemSalabilityToSaleable = jest.fn();
    try {
      //Act
      itemService.setItemSalability(itemId, userId);
    } catch (error) {
      //Assert
      expect(itemRepository.getItemById).toHaveBeenCalledTimes(1);
      expect(itemRepository.getItemById).toHaveBeenCalledWith(itemId);
      expect(userRepository.getUserById).toHaveBeenCalledTimes(0);
      expect(itemRepository.setItemSalabilityToSaleable).toHaveBeenCalledTimes(
        0,
      );
      expect(itemRepository.setItemSalabilityToUnsaleable(0));
      expect(error).toStrictEqual(notFoundError('Item not found'));
    }
  });

  it('item is not belong to the user', async () => {
    //Arrange
    const itemId = 4;

    const itemData = {
      id: 4,
      itemName: 'cup',
      description: 'Coffee cup crafted in extra fine Limoges porcelain.',
      photoUrl:
        'https://media.dior.com/couture/ecommerce/media/catalog/product/j/V/1654594988_HYJ02CTJ0U_C510_E01_ZHC.jpg?imwidth=870',
      price: 150,
      selable: 2,
      sellersName: 'UserName1',
    };
    const userId = 1;

    const userData = {
      id: 1,
      name: 'UserName111',
      password: 'asdfaséaásél2',
      dollar: 1200,
    };
    itemRepository.getItemById = jest.fn().mockResolvedValue(itemData);
    userRepository.getUserById = jest.fn().mockResolvedValue(userData);
    itemRepository.setItemSalabilityToUnsaleable = jest.fn();
    itemRepository.setItemSalabilityToSaleable = jest.fn();

    try {
      //Act
      await itemService.setItemSalability(itemId, userId);
    } catch (error) {
      //Assert
      expect(itemRepository.getItemById).toHaveBeenCalledTimes(1);
      expect(itemRepository.getItemById).toHaveBeenCalledWith(itemId);
      expect(userRepository.getUserById).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(error).toStrictEqual(
        forbiddenError('You can not modify an item if it is not yours'),
      );
    }
  });

  it('item is not available anymore when it is already sold', async () => {
    //Arrange
    const itemId = 4;

    const itemData = {
      id: 4,
      itemName: 'cup',
      description: 'Coffee cup crafted in extra fine Limoges porcelain.',
      photoUrl:
        'https://media.dior.com/couture/ecommerce/media/catalog/product/j/V/1654594988_HYJ02CTJ0U_C510_E01_ZHC.jpg?imwidth=870',
      price: 150,
      selable: 3,
      sellersName: 'UserName1',
    };
    const userId = 1;

    const userData = {
      id: 1,
      name: 'UserName1',
      password: 'asdfaséaásél2',
      dollar: 1200,
    };
    itemRepository.getItemById = jest.fn().mockResolvedValue(itemData);
    userRepository.getUserById = jest.fn().mockResolvedValue(userData);
    itemRepository.setItemSalabilityToUnsaleable = jest.fn();
    itemRepository.setItemSalabilityToSaleable = jest.fn();

    try {
      //Act
      await itemService.setItemSalability(itemId, userId);
    } catch (error) {
      //Assert
      expect(itemRepository.getItemById).toHaveBeenCalledTimes(1);
      expect(itemRepository.getItemById).toHaveBeenCalledWith(itemId);
      expect(userRepository.getUserById).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(error).toStrictEqual(forbiddenError('Item is already sold'));
    }
  });

  it('item saleable modified', async () => {
    //Arrange
    const itemId = 4;

    const itemData = {
      id: 4,
      itemName: 'cup',
      description: 'Coffee cup crafted in extra fine Limoges porcelain.',
      photoUrl:
        'https://media.dior.com/couture/ecommerce/media/catalog/product/j/V/1654594988_HYJ02CTJ0U_C510_E01_ZHC.jpg?imwidth=870',
      price: 150,
      selable: 1,
      sellersName: 'UserName1',
    };
    const userId = 1;

    const userData = {
      id: 1,
      name: 'UserName1',
      password: 'asdfaséaásél2',
      dollar: 1200,
    };
    itemRepository.getItemById = jest.fn().mockResolvedValue(itemData);
    userRepository.getUserById = jest.fn().mockResolvedValue(userData);
    itemRepository.setItemSalabilityToUnsaleable = jest.fn();
    itemRepository.setItemSalabilityToSaleable = jest.fn();

    //Act
    await itemService.setItemSalability(itemId, userId);

    //Assert
    expect(itemRepository.getItemById).toHaveBeenCalledTimes(1);
    expect(itemRepository.getItemById).toHaveBeenCalledWith(itemId);
    expect(userRepository.getUserById).toHaveBeenCalledTimes(1);
    expect(userRepository.getUserById).toHaveBeenCalledWith(userId);
    expect(itemRepository.setItemSalabilityToUnsaleable).toHaveBeenCalledTimes(
      1,
    );
    expect(itemRepository.setItemSalabilityToSaleable).toHaveBeenCalledTimes(0);
  });
});

describe('itemService, buyItem', () => {
  it('item not found', async () => {
    //Arrange
    const itemId = 40;
    const userId = 1;
    itemRepository.getItemById = jest.fn().mockResolvedValue(null);
    userRepository.getUserById = jest.fn();
    itemRepository.buyItem = jest.fn();
    userRepository.buyItem = jest.fn();
    userRepository.sellItem = jest.fn();
    try {
      //Act
      itemService.buyItem(itemId, userId);
    } catch (error) {
      //Assert
      expect(itemRepository.getItemById).toHaveBeenCalledTimes(1);
      expect(itemRepository.getItemById).toHaveBeenCalledWith(itemId);
      expect(userRepository.getUserById).toHaveBeenCalledTimes(0);
      expect(error).toStrictEqual(notFoundError('Item not found'));
    }
  });

  it('item is belong to the user so it can be bought', async () => {
    //Arrange
    const itemId = 4;

    const itemData = {
      id: 4,
      itemName: 'cup',
      description: 'Coffee cup crafted in extra fine Limoges porcelain.',
      photoUrl:
        'https://media.dior.com/couture/ecommerce/media/catalog/product/j/V/1654594988_HYJ02CTJ0U_C510_E01_ZHC.jpg?imwidth=870',
      price: 150,
      selable: 2,
      sellersName: 'UserName1',
    };
    const userId = 1;

    const userData = {
      id: 1,
      name: 'UserName1',
      password: 'asdfaséaásél2',
      dollar: 1200,
    };
    itemRepository.getItemById = jest.fn().mockResolvedValue(itemData);
    userRepository.getUserById = jest.fn().mockResolvedValue(userData);
    itemRepository.buyItem = jest.fn();
    userRepository.buyItem = jest.fn();
    userRepository.sellItem = jest.fn();

    try {
      //Act
      itemService.buyItem(itemId, userId);
    } catch (error) {
      //Assert
      expect(itemRepository.getItemById).toHaveBeenCalledTimes(1);
      expect(itemRepository.getItemById).toHaveBeenCalledWith(itemId);
      expect(userRepository.getUserById).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(error).toStrictEqual(
        forbiddenError('It is your own item, you can not buy it'),
      );
    }
  });

  it('user have not enough dollar to buy the item', () => {
    //Arrange
    const itemId = 4;

    const itemData = {
      id: 4,
      itemName: 'cup',
      description: 'Coffee cup crafted in extra fine Limoges porcelain.',
      photoUrl:
        'https://media.dior.com/couture/ecommerce/media/catalog/product/j/V/1654594988_HYJ02CTJ0U_C510_E01_ZHC.jpg?imwidth=870',
      price: 150,
      selable: 2,
      sellersName: 'UserName1',
    };
    const userId = 1;

    const userData = {
      id: 1,
      name: 'UserName2',
      password: 'asdfaséaásél2',
      dollar: 50,
    };
    itemRepository.getItemById = jest.fn().mockResolvedValue(itemData);
    userRepository.getUserById = jest.fn().mockResolvedValue(userData);
    itemRepository.buyItem = jest.fn();
    userRepository.buyItem = jest.fn();
    userRepository.sellItem = jest.fn();

    try {
      //Act
      itemService.buyItem(itemId, userId);
    } catch (error) {
      //Assert
      expect(itemRepository.getItemById).toHaveBeenCalledTimes(1);
      expect(itemRepository.getItemById).toHaveBeenCalledWith(itemId);
      expect(userRepository.getUserById).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserById).toHaveBeenCalledWith(userId);
      expect(error).toStrictEqual(
        forbiddenError('You have not enough dollars to buy this item'),
      );
    }
  });

  it('user bought the item successfully', async () => {
    //Arrange
    const itemId = 4;

    const itemData = {
      id: 4,
      itemName: 'cup',
      description: 'Coffee cup crafted in extra fine Limoges porcelain.',
      photoUrl:
        'https://media.dior.com/couture/ecommerce/media/catalog/product/j/V/1654594988_HYJ02CTJ0U_C510_E01_ZHC.jpg?imwidth=870',
      price: 150,
      selable: 1,
      sellersName: 'UserName1',
    };
    const userId = 1;

    const userData = {
      id: 1,
      name: 'UserName2',
      password: 'asdfaséaásél2',
      dollar: 1200,
    };
    itemRepository.getItemById = jest.fn().mockResolvedValue(itemData);
    userRepository.getUserById = jest.fn().mockResolvedValue(userData);
    itemRepository.buyItem = jest.fn();
    userRepository.buyItem = jest.fn();
    userRepository.sellItem = jest.fn();

    //Act
    await itemService.buyItem(itemId, userId);

    //Assert
    expect(itemRepository.getItemById).toHaveBeenCalledTimes(1);
    expect(itemRepository.getItemById).toHaveBeenCalledWith(itemId);
    expect(userRepository.getUserById).toHaveBeenCalledTimes(1);
    expect(userRepository.getUserById).toHaveBeenCalledWith(userId);
    expect(itemRepository.buyItem).toHaveBeenCalledTimes(1);
    expect(itemRepository.buyItem).toHaveBeenCalledWith(itemId);
    expect(userRepository.buyItem).toHaveBeenCalledTimes(1);
    expect(userRepository.buyItem).toHaveBeenCalledWith(userId, itemData.price);
    expect(userRepository.sellItem).toHaveBeenCalledTimes(1);
    expect(userRepository.sellItem).toHaveBeenCalledWith(
      itemData.sellersName,
      itemData.price,
    );
  });
});
