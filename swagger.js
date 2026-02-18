const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Réservation de Chambres",
      version: "1.0.0",
      description: "Documentation interactive (Gestion des utilisateurs, chambres et réservations)",
    },
    servers: [
      {
        url: "https://projetnosql-q73t.onrender.com",
      },
    ],
    // DÉCLARATION DES ROUTES ICI (Pour éviter le crash du scanner)
    paths: {
      "/api/users": {
        get: {
          summary: "Récupérer tous les utilisateurs",
          tags: ["Users"],
          responses: {
            200: {
              description: "Succès",
              content: {
                "application/json": {
                  schema: { type: "array", items: { $ref: "#/components/schemas/User" } }
                }
              }
            }
          }
        }
      }
    },
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", example: "65a1b2c3d4e5f6g7h8i9j0" },
            username: { type: "string", example: "jean_dupont" },
            email: { type: "string", example: "jean@example.com" },
            role: { type: "string", enum: ["admin", "user"], default: "user" }
          }
        },
        Room: {
          type: "object",
          properties: {
            id: { type: "string", example: "room_001" },
            name: { type: "string", example: "Suite Royale" },
            capacity: { type: "integer", example: 2 },
            pricePerNight: { type: "number", example: 150.50 },
            isAvailable: { type: "boolean", example: true }
          }
        },
        Reservation: {
          type: "object",
          properties: {
            id: { type: "string", example: "res_999" },
            userId: { type: "string" },
            roomId: { type: "string" },
            startDate: { type: "string", format: "date" },
            endDate: { type: "string", format: "date" },
            totalPrice: { type: "number" }
          }
        }
      }
    }
  },
  // TRÈS IMPORTANT : On met la liste vide pour ne plus scanner les fichiers qui buggent
  apis: [], 
};

module.exports = swaggerJsdoc(options);