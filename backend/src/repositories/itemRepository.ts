import { OkPacket } from 'mysql';
import { db } from '../data/connection';
import { ItemDataDomainModel } from '../models/domian/ItemDataDomainModel';

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

  async getItemById(itemId: number): Promise<ItemDataDomainModel> {
    const getItemByIdQuery: string = `
                                      SELECT 
                    i.id as id, i.name, i.description, i.photoUrl, i.price, i.sellable, u.name
                                      FROM items i
                                      JOIN users u
                                          ON i.userId = u.id
                                      WHERE i.id = ?`;

    const item = await db.query<ItemDataDomainModel[]>(getItemByIdQuery, [
      itemId.toString(),
    ]);

    return item[0];
  },
};
