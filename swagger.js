const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API du projet",
      version: "1.0.0",
      description: "Documentation de l’API Node.js",
    },
    servers: [
      {
        url: "https://projetnosql-q73t.onrender.com",
      },
    ],
  },
  apis: ["./routes/*.js"], // adapte si besoin
};

module.exports = swaggerJsdoc(options);