import swaggerJSDoc from 'swagger-jsdoc';
import { SwaggerOptions } from 'swagger-ui-express';
import config from '../config';

const swaggerOptions: SwaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'GreenBay API',
      version: '1.0.0',
      description: 'Ebay webshop endpoints',
    },
    servers: [`${config.servers.host}:${config.servers.port}`],
  },
  apis: [
    './src/routes/user.routes.ts',
    './src/routes/api.routes.ts',
    './src/routes/item.routes.ts',
    './src/routes/userDetails.routes.ts',
  ],
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);
