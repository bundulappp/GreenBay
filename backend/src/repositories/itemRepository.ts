import { OkPacket } from 'mysql';
import { db } from '../data/connection';
import { ItemCategoryDomainModel } from '../models/domian/itemCategoryDomainModel';
import { ItemDataDomainModel } from '../models/domian/ItemDataDomainModel';
import { CategoryType } from '../models/enums/CategoryType';
import { ItemIsSelable } from '../models/enums/ItemIsSellable';

export const itemRepository = {
  async getAllSelableItems(): Promise<ItemDataDomainModel[]> {
    const getAllSelableQuery: string = `SELECT 
                  i.id as id, i.name as itemName, i.description, i.photoUrl, i.price, i.selable, u.name as sellersName
                                      FROM items i
                                      JOIN users u
                                      ON i.userId = u.id
                                      WHERE selable = ?`;

    return await db.query(getAllSelableQuery, [
      ItemIsSelable.saleable.toString(),
    ]);
  },

  async getItemById(id: number): Promise<ItemDataDomainModel> {
    const getItemByIdQuery: string = `
                                      SELECT 
                    i.id as id, i.name as itemName, i.description, i.photoUrl, i.price, i.selable, u.name as sellersName
                                      FROM items i
                                      JOIN users u
                                          ON i.userId = u.id
                                      WHERE i.id = ?`;

    const item = await db.query<ItemDataDomainModel[]>(getItemByIdQuery, [
      id.toString(),
    ]);
    return item[0];
  },

  async getDisabledItemsByUserId(
    userId: number,
  ): Promise<ItemDataDomainModel[]> {
    const getUsersItemQuery: string = `SELECT 
    i.id as id, i.name as itemName, i.description, i.photoUrl, i.price, i.selable, u.name as sellersName
                FROM items i
                JOIN users u
                    ON i.userId = u.id
                WHERE u.id = ?
                AND 
                 i.selable =?
                                `;

    return await db.query<ItemDataDomainModel[]>(getUsersItemQuery, [
      userId.toString(),
      ItemIsSelable.unsalable.toString(),
    ]);
  },

  async getAllCategories(): Promise<ItemCategoryDomainModel[]> {
    const getCategoryQuery: string = `SELECT * FROM categories`;

    return await db.query<ItemCategoryDomainModel[]>(getCategoryQuery);
  },

  async addNewItem(
    name: string,
    description: string,
    photoUrl: string,
    price: number,
    userId: number,
    category: CategoryType,
  ): Promise<number> {
    const addNewItemQuery: string = `INSERT INTO
                                        items(
                                            name, 
                                            description, 
                                            photoUrl, 
                                            price, 
                                            userId,
                                            categoryId
                                        )
                                VALUES (
                                    ?,?,?,?,?,?
                                )`;

    const newItemResult = await db.query<OkPacket>(addNewItemQuery, [
      name,
      description,
      photoUrl,
      price.toString(),
      userId.toString(),
      category.toString(),
    ]);

    return newItemResult.insertId;
  },

  async setItemSalabilityToUnsaleable(itemId: number): Promise<void> {
    const setItem: string = `
                                      UPDATE
                                            items
                                      SET
                                            selable = ?
                                      WHERE
                                      id = ?`;
    await db.query(setItem, [
      ItemIsSelable.unsalable.toString(),
      itemId.toString(),
    ]);
  },

  async setItemSalabilityToSaleable(itemId: number): Promise<void> {
    const setItem: string = `
                                      UPDATE
                                            items
                                      SET
                                            selable = ?
                                      WHERE
                                      id = ?`;
    await db.query(setItem, [
      ItemIsSelable.saleable.toString(),
      itemId.toString(),
    ]);
  },

  async buyItem(itemId: number): Promise<void> {
    const setItem: string = `
                                      UPDATE
                                            items
                                      SET
                                            selable = ?
                                      WHERE
                                            id = ?`;
    await db.query(setItem, [ItemIsSelable.sold.toString(), itemId.toString()]);
  },
};
