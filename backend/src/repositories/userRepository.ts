import { OkPacket } from 'mysql';
import { db } from '../data/connection';
import { UserDomainModel } from '../models/domian/UserDomainModel';

export const userRepository = {
  async registerUser(username: string, password: string): Promise<number> {
    const registrationQuery: string = `INSERT INTO
                                            users (
                                                name,
                                                password
                                             )
                                        VALUES (
                                            ?, ?
                                        )
    `;

    const registrationResult = await db.query<OkPacket>(registrationQuery, [
      username,
      password,
    ]);

    return registrationResult.insertId;
  },

  async getUserByName(username: string): Promise<UserDomainModel> {
    const query: string = `SELECT
                                *
                            FROM
                                users
                            WHERE
                                name = ?
      `;

    const userList = await db.query<UserDomainModel[]>(query, [username]);
    return userList[0];
  },

  async getUserById(userId: number): Promise<UserDomainModel> {
    const query: string = `SELECT
                                *
                            FROM
                                users
                            WHERE
                                id = ?
      `;

    const userList = await db.query<UserDomainModel[]>(query, [
      userId.toString(),
    ]);
    return userList[0];
  },
};
