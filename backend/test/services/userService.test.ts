import { UserRegistrationRequestModel } from '../../src/models/request/UserRegistrationRequestModel';
import { userRepository } from '../../src/repositories/userRepository';
import {
  conflictError,
  unauthorizedError,
} from '../../src/services/generalErrorService';
import { jwtService } from '../../src/services/jwtService';
import { passwordService } from '../../src/services/passwordService';
import { userService } from '../../src/services/userService';

describe('userService, register', () => {
  it('username is already exist and get a 409 conflict', async () => {
    //Arrange
    const newUserData = {
      username: 'UserName',
      password: '12345678',
    };
    const oldUserData = {
      id: 1,
      name: 'UserName',
      password: 'awdawda6546451613a5sdasd',
      dollar: 1000,
    };
    userRepository.getUserByName = jest.fn().mockResolvedValue(oldUserData);
    userRepository.registerUser = jest.fn();
    try {
      //Act
      await userService.register(newUserData);
    } catch (error) {
      //Assert
      expect(userRepository.getUserByName).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserByName).toHaveBeenCalledWith('UserName');
      expect(userRepository.registerUser).toHaveBeenCalledTimes(0);
      expect(error).toStrictEqual(conflictError('Username is already taken.'));
    }
  });

  it('user register successfully', async () => {
    //Arrange
    const userData: UserRegistrationRequestModel = {
      username: 'userName',
      password: '12345678',
    };
    userRepository.getUserByName = jest.fn().mockResolvedValue(null);
    passwordService.generateHash = jest.fn().mockReturnValue('password123');
    userRepository.registerUser = jest.fn().mockResolvedValue(1);
    //Act
    await userService.register(userData);
    //Assert
    expect(userRepository.getUserByName).toHaveBeenCalledTimes(1);
    expect(userRepository.getUserByName).toHaveBeenCalledWith('userName');
    expect(userRepository.registerUser).toHaveBeenCalledTimes(1);
    expect(userRepository.registerUser).toHaveBeenCalledWith(
      'userName',
      'password123',
    );
  });
});

describe('userService, login', () => {
  it('User not found by username and get 401', async () => {
    //Arrange
    const userData = {
      username: 'UserName',
      password: '12345678',
    };
    userRepository.getUserByName = jest.fn().mockResolvedValue(null);
    passwordService.comparePasswords = jest.fn();
    jwtService.generateAccessToken = jest.fn();
    try {
      //Act
      await userService.login(userData);
    } catch (error) {
      //Assert
      expect(userRepository.getUserByName).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserByName).toHaveBeenCalledWith('UserName');
      expect(passwordService.comparePasswords).toHaveBeenCalledTimes(0);
      expect(error).toStrictEqual(
        unauthorizedError('Username or password is incorrect!'),
      );
    }
  });

  it('password is not correct and get 401', async () => {
    //Arrange
    const userDataWithWrongPassword = {
      username: 'UserName',
      password: '12345678',
    };

    const userData = {
      id: 1,
      name: 'UserName',
      password: 'awdawda6546451613a5sdasd',
      dollar: 1000,
    };

    userRepository.getUserByName = jest.fn().mockResolvedValue(userData);
    passwordService.comparePasswords = jest.fn().mockReturnValue(false);

    try {
      //Act
      await userService.login(userDataWithWrongPassword);
    } catch (error) {
      //Assert
      expect(userRepository.getUserByName).toHaveBeenCalledTimes(1);
      expect(userRepository.getUserByName).toHaveBeenCalledWith('UserName');
      expect(passwordService.comparePasswords).toHaveBeenCalledTimes(1);
      expect(passwordService.comparePasswords).toHaveBeenCalledWith(
        '12345678',
        'awdawda6546451613a5sdasd',
      );
      expect(error).toStrictEqual(
        unauthorizedError('Username or password is incorrect!'),
      );
    }
  });

  it('login successfully and return the proper user object', async () => {
    //Arrange
    const userLoginData = {
      username: 'UserName',
      password: '12345678',
    };

    const userData = {
      id: 1,
      name: 'UserName',
      password: 'awdawda6546451613a5sdasd',
      dollar: 1000,
    };

    const token = {
      userId: 1,
      userName: 'UserName',
    };

    userRepository.getUserByName = jest.fn().mockResolvedValue(userData);
    passwordService.comparePasswords = jest.fn().mockReturnValue(true);
    jwtService.generateAccessToken = jest.fn().mockResolvedValue(token);

    const expectReturn = {
      token,
      username: userData.name,
      dollar: userData.dollar,
    };

    //Act
    const result = await userService.login(userLoginData);
    //Assert
    expect(userRepository.getUserByName).toHaveBeenCalledTimes(1);
    expect(userRepository.getUserByName).toHaveBeenCalledWith('UserName');
    expect(passwordService.comparePasswords).toHaveBeenCalledTimes(1);
    expect(passwordService.comparePasswords).toHaveBeenCalledWith(
      '12345678',
      'awdawda6546451613a5sdasd',
    );
    expect(jwtService.generateAccessToken).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(expectReturn);
  });
});
