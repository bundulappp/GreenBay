import { UserRegistrationRequestModel } from '../models/request/UserRegistrationRequestModel';
import { userRepository } from '../repositories/userRepository';
import { conflictError } from './generalErrorService';
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
};
