import { NextFunction, Request, Response } from 'express';
import { UserRegistrationRequestModel } from '../models/request/UserRegistrationRequestModel';
import { UserLoginRequestViewModel } from '../models/view/UserLoginRequestViewModel';
import { UserLoginViewModel } from '../models/view/UserLoginViewModel';
import { UserRegistrationRequestViewModel } from '../models/view/UserRegistrationRequestViewModel';
import { badRequestError } from '../services/generalErrorService';
import { userService } from '../services/userService';

export const userController = {
  async register(
    req: Request<UserRegistrationRequestViewModel>,
    res: Response<void>,
    next: NextFunction,
  ) {
    const { username, password } = req.body;
    if (!username && !password) {
      next(badRequestError('Username, password are required.'));
      return;
    }

    if (!password) {
      next(badRequestError('Password is required.'));
      return;
    }

    if (!username) {
      next(badRequestError('Username is required.'));
      return;
    }

    if (password.length < 8) {
      next(badRequestError('Password must be 8 characters.'));
      return;
    }

    const registrationData: UserRegistrationRequestModel = {
      username,
      password,
    };

    try {
      await userService.register(registrationData);
      res.status(201).send();
    } catch (err) {
      next(err);
    }
  },

  async login(
    request: Request<UserLoginRequestViewModel>,
    response: Response<UserLoginViewModel>,
    next: NextFunction,
  ) {
    const { username, password } = request.body;

    if (!username && !password) {
      next(badRequestError('All fields are required'));
      return;
    }

    if (!password) {
      next(badRequestError('Password is required'));
      return;
    }

    if (!username) {
      next(badRequestError('Username is required'));
      return;
    }

    const loginData: UserLoginRequestViewModel = {
      username,
      password,
    };

    try {
      const user = await userService.login(loginData);
      response.status(200).send(user);
    } catch (error) {
      next(error);
    }
  },
};
