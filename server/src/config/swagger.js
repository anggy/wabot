import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Wabot API',
            version: '1.0.0',
            description: 'API Documentation for Wabot WhatsApp Automation',
        },
        servers: [
            {
                url: process.env.VITE_API_URL || 'http://localhost:3002',
                description: 'Development server',
            },
            {
                url: 'https://wabot.homesislab.my.id',
                description: 'Production server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js'], // Path to the API docs
};

const specs = swaggerJsdoc(options);

export const swaggerDocs = (app, port) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));
    console.log(`Docs available at http://localhost:${port}/api/docs`);
};
