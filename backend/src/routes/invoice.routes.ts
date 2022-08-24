import express from 'express';

const invoiceRouter = express.Router();

/**
 * @swagger
 * /api/invoice:
 *  post:
 *      tags:
 *      - INVOICE
 *      description: Add a new invoice
 *      parameters:
 *          - in: header
 *            name: authorization
 *            schema:
 *              type: string
 *              example: Bearer rh4b5b435njfd
 *          - in: body
 *            name: Invoice object
 *            description: Provides necessary invoice parameters
 *            schema:
 *              type: object
 *              properties:
 *                itemId:
 *                  type: int
 *                  example: 1
 *                purchaseDate:
 *                  type: date
 *                  example: 2022-06-27 07:04:37
 *                buyerId:
 *                  type: int
 *                  example: 1
 *      responses:
 *          201:
 *              description: Created
 *          400:
 *              description: Bad Request
 *          500:
 *              description: Internal server error
 */
invoiceRouter.post('');

export default invoiceRouter;
