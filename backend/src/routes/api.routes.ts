import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './swaggerOptions';
import userRouter from './user.routes';
import itemRouter from './item.routes';
import userDetailsRouter from './userDetails.routes';
import invoiceRouter from './invoice.routes';
import authenticate from '../middlewares/authenticator';

const apiRouter = express.Router();

apiRouter.use(cors());
apiRouter.use(express.json());
apiRouter.use('/greenbay-api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
apiRouter.use('/user', userRouter);
apiRouter.use(authenticate);
apiRouter.use('/item', itemRouter);
apiRouter.use('/user-details', userDetailsRouter);
apiRouter.use('/invoice', invoiceRouter);

export default apiRouter;
