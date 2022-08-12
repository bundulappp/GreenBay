import { OkPacket } from 'mysql';
import { db } from '../data/connection';

export const itemRepository = {
  async addNewItem(
    name: string,
    description: string,
    photoUrl: string,
    price: number,
    userId: number,
  ): Promise<number> {
    const addNewItemQuery: string = `INSERT INTO
                                        items(
                                            name, 
                                            description, 
                                            photoUrl, 
                                            price, 
                                            userId
                                        )
                                VALUES (
                                    ?,?,?,?,?
                                )`;

    const newItemResult = await db.query<OkPacket>(addNewItemQuery, [
      name,
      description,
      photoUrl,
      price.toString(),
      userId.toString(),
    ]);

    return newItemResult.insertId;
  },
};
