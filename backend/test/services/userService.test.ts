import { UserRegistrationRequestModel } from '../../src/models/request/UserRegistrationRequestModel';
import { userRepository } from '../../src/repositories/userRepository';
import { passwordService } from '../../src/services/passwordService';
import { userService } from '../../src/services/userService';

describe('userService', () => {
  it('register should be successfull', async () => {
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
