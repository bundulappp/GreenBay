import express from 'express';
import { itemController } from '../controllers/itemController';

const itemRouter = express.Router();

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

export default itemRouter;
