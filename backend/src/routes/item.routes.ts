import express from 'express';
import { itemController } from '../controllers/itemController';

const itemRouter = express.Router();

/**
 * @swagger
 * /api/item:
 *  get:
 *      tags:
 *      - ITEM
 *      description: Get all saleable items
 *      parameters:
 *          - in: header
 *            name: authorization
 *            schema:
 *              type: string
 *              example: Bearer asdasdawd123
 *      responses:
 *          200:
 *              description: Successfull search
 *          404:
 *              description: User is not found
 *          500:
 *              description: Internal server error
 */
itemRouter.get('', itemController.getAllSaleableItems);

/**
 * @swagger
 * /api/item/{id}:
 *  get:
 *      tags:
 *      - ITEM
 *      description: Get an item
 *      parameters:
 *          - in: header
 *            name: authorization
 *            schema:
 *              type: string
 *              example: Bearer asdasdawd123
 *          - in: path
 *            name: id
 *            description: ID of item
 *            schema:
 *              type: number
 *              example: 1
 *      responses:
 *          200:
 *              description: Successfull search
 *          400:
 *              description: id missing or wrong from path
 *          404:
 *              description: Item not found
 *          500:
 *              description: Internal server error
 */
itemRouter.get('/:id', itemController.getItemData);

/**
 * @swagger
 * /api/item:
 *  post:
 *      tags:
 *      - ITEM
 *      description: Add a new item
 *      parameters:
 *          - in: header
 *            name: authorization
 *            schema:
 *              type: string
 *              example: Bearer rh4b5b435njfd
 *          - in: body
 *            name: Item object
 *            description: Provides necessary item parameters
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: phone
 *                description:
 *                  type: string
 *                  example: Huawei P20 pro
 *                photoUrl:
 *                  type: string
 *                  example: https://hu.wikipedia.org/wiki/Macska
 *                  summary: Should be a valid URL
 *                price:
 *                  type: int
 *                  example: 1200
 *      responses:
 *          201:
 *              description: Created
 *          400:
 *              description: Bad Request
 *          500:
 *              description: Internal server error
 */
itemRouter.post('', itemController.addNewItem);

/**
 * @swagger
 * /api/item/{id}:
 *  put:
 *      tags:
 *      - ITEM
 *      description: modify selable column in items table
 *      parameters:
 *          - in: header
 *            name: authorization
 *            schema:
 *              type: string
 *              example: Bearer asdasda01
 *          - in: path
 *            name: id
 *            description: ID of item
 *            schema:
 *              type: number
 *              example: 1
 *      responses:
 *          200:
 *              description: Item updated
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Forbidden item is already sold
 *          404:
 *              description: Item not found
 *          500:
 *              description: Internal server error
 */
itemRouter.put('/:id', itemController.setItemSalability);

/**
 * @swagger
 * /api/item/buy:
 *  put:
 *      tags:
 *      - ITEM
 *      description: Buy an item
 *      parameters:
 *          - in: header
 *            name: authorization
 *            schema:
 *              type: string
 *              example: Bearer asda21230
 *          - in: body
 *            name: itemId
 *            schema:
 *              type: object
 *              properties:
 *                itemId:
 *                  type: number
 *                  example: 1
 *      responses:
 *          200:
 *              description: Item bought
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 *          403:
 *              description: Item not available for buying
 *          404:
 *              description: Item not found
 *          500:
 *              description: Internal server error
 */
itemRouter.put('/buy', itemController.buyItem);

export default itemRouter;
