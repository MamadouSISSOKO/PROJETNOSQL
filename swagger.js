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
    // AJOUT DES COMPOSANTS (SCHÉMAS)
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["username", "password"], // Champs obligatoires
          properties: {
            id: {
              type: "string",
              description: "L'identifiant unique généré par MongoDB",
            },
            username: {
              type: "string",
              description: "Le nom de l'utilisateur",
            },
            password: {
              type: "string",
              description: "Le mot de passe (haché)",
            },
            role: {
              type: "string",
              enum: ["admin", "user"],
              default: "user",
            }
          },
          example: {
            username: "RobbieLens",
            password: "monPasswordSecurise123",
            role: "user"
          }
        }
      }
    }
  },
  apis: ["./Routes/*.js"], // Vérifie bien que c'est "Routes" avec une majuscule !
};

module.exports = swaggerJsdoc(options);