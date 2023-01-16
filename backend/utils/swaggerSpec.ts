import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
    definition:{
        openapi: "3.0.0",
        info:{
            title: 'CryptoHub API',
            description: "A REST API built with Express and MongoDB.",
            version: "1.0"
        },
        servers: [
            {
                url: 'http://localhost:9666/cryptohub/api',
                description: 'Backend server',
            },
        ]
    },
    apis: ["./js/routes/users.js"]
}
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;