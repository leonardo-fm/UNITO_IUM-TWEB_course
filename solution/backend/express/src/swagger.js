const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express API',
            version: '1.0.0'
        }
    },
    apis: ["src/routes/player.js", "src/routes/game.js", "src/routes/chat.js"]
};

const swaggerSpec = swaggerJsDoc(swaggerOptions);

module.exports = {
    swaggerDocs: (app, port) => {
        app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
        console.log("Swagger listening on port " + port + "/api-docs");
    }
}