import express from 'express';
import { userController } from '../controllers/userController';

const userDetailsRouter = express.Router();

/**
 * @swagger
 * /api/user-details/money:
 *  get:
 *      tags:
 *      - USER-DETAILS
 *      description: Get user dollars
 *      parameters:
 *          - in: header
 *            name: authorization
 *            schema:
 *              type: string
 *              example: Bearer asdad20131
 *      responses:
 *          200:
 *              description: Data send successfully
 *          404:
 *              description: User not found
 *          500:
 *              description: Internal server error
 */
userDetailsRouter.get('/money', userController.getUserDollar);

export default userDetailsRouter;
