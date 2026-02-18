const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Réservation de Chambres",
      version: "1.0.0",
      description: "Documentation complète de l'API (Users, Rooms, Reservations)",
    },
    servers: [
      {
        url: "https://projetnosql-q73t.onrender.com",
      },
    ],
    paths: {
      // ================= ENDPOINTS UTILISATEURS =================
      "/api/users": {
        get: {
          summary: "Liste de tous les utilisateurs",
          tags: ["Users"],
          responses: {
            200: { description: "Succès" },
            500: { description: "Erreur serveur" }
          }
        },
        post: {
          summary: "Créer un utilisateur",
          tags: ["Users"],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } }
          },
          responses: {
            201: { description: "Utilisateur créé" },
            400: { description: "Données manquantes ou invalides" }
          }
        }
      },

      // ================= ENDPOINTS CHAMBRES (ROOMS) =================
      "/api/rooms": {
        get: {
          summary: "Liste de toutes les chambres",
          tags: ["Rooms"],
          responses: {
            200: { description: "Succès" }
          }
        },
        post: {
          summary: "Ajouter une nouvelle chambre",
          tags: ["Rooms"],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/Room" } } }
          },
          responses: {
            201: { description: "Chambre ajoutée" },
            400: { description: "Erreur de validation" }
          }
        }
      },

      // ================= ENDPOINTS RÉSERVATIONS =================
      "/api/reservations": {
        get: {
          summary: "Liste de toutes les réservations",
          tags: ["Reservations"],
          responses: {
            200: { description: "Succès" }
          }
        },
        post: {
          summary: "Réserver une chambre",
          tags: ["Reservations"],
          requestBody: {
            required: true,
            content: { "application/json": { schema: { $ref: "#/components/schemas/Reservation" } } }
          },
          responses: {
            201: { description: "Réservation confirmée" },
            400: { description: "Chambre non disponible ou données erronées" },
            404: { description: "Utilisateur ou Chambre introuvable" }
          }
        }
      },
      "/api/reservations/{id}": {
        delete: {
          summary: "Annuler une réservation",
          tags: ["Reservations"],
          parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
          responses: {
            200: { description: "Réservation annulée" },
            404: { description: "Réservation introuvable" }
          }
        }
      }
    },
    components: {
      schemas: {
        User: {
          type: "object",
          required: ["username", "email"],
          properties: {
            username: { type: "string", example: "Mamadou" },
            email: { type: "string", example: "mamadou@test.com" },
            role: { type: "string", enum: ["admin", "user"], default: "user" }
          }
        },
        Room: {
          type: "object",
          required: ["name", "pricePerNight"],
          properties: {
            name: { type: "string", example: "Suite Luxe" },
            capacity: { type: "integer", example: 2 },
            pricePerNight: { type: "number", example: 120 },
            isAvailable: { type: "boolean", default: true }
          }
        },
        Reservation: {
          type: "object",
          required: ["userId", "roomId", "startDate", "endDate"],
          properties: {
            userId: { type: "string", example: "ID_USER_123" },
            roomId: { type: "string", example: "ID_ROOM_456" },
            startDate: { type: "string", format: "date", example: "2024-03-01" },
            endDate: { type: "string", format: "date", example: "2024-03-05" }
          }
        }
      }
    }
  },
  apis: [], // On garde vide pour éviter le crash sur Render
};

module.exports = swaggerJsdoc(options);