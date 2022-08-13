import { UserRegistrationRequestModel } from '../models/request/UserRegistrationRequestModel';
import { UserLoginRequestViewModel } from '../models/view/UserLoginRequestViewModel';
import { UserLoginViewModel } from '../models/view/UserLoginViewModel';
import { userRepository } from '../repositories/userRepository';
import { conflictError, unauthorizedError } from './generalErrorService';
import { jwtService } from './jwtService';
import { passwordService } from './passwordService';

export const userService = {
  async register(userData: UserRegistrationRequestModel): Promise<void> {
    if (await this.checkIfUsernameExists(userData.username)) {
      throw conflictError('Username is already taken.');
    }

    const hashedPassword = passwordService.generateHash(userData.password);

    await userRepository.registerUser(userData.username, hashedPassword);
  },

  async checkIfUsernameExists(username: string): Promise<boolean> {
    return !!(await userRepository.getUserByName(username));
  },

  async login(
    userData: UserLoginRequestViewModel,
  ): Promise<UserLoginViewModel> {
    const playerData = await userRepository.getUserByName(userData.username);
    if (
      !playerData ||
      !passwordService.comparePasswords(userData.password, playerData.password)
    ) {
      throw unauthorizedError('Username or password is incorrect!');
    }

    const token: string = await jwtService.generateAccessToken(
      playerData.id,
      playerData.name,
    );

    return {
      token,
      username: userData.username,
    };
  },
};
