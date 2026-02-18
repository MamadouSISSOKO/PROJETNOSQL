require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");

const app = express();

// ===== Middlewares =====
app.use(express.json());

// ===== Swagger =====
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ===== Routes =====
const userRoutes = require("./Routes/users");
const roomRoutes = require("./Routes/rooms");        // Vérifie que le fichier s'appelle bien rooms.js
const reservationRoutes = require("./Routes/reservation"); // Vérifie s'il y a un 's' ou pas

app.use("/api", userRoutes);
app.use("/api", roomRoutes);
app.use("/api", reservationRoutes);

// ===== MongoDB =====
const dbUrl = process.env.ENV === "dev" 
  ? `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  : process.env.URL;

mongoose.connect(dbUrl)
  .then(() => console.log(`✅ MongoDB ${process.env.ENV || 'PROD'} connecté`))
  .catch(err => console.error("❌ Erreur de connexion MongoDB", err));

// ===== 404 =====
app.use((req, res) => {
  res.status(404).json({
    message: "Route non trouvée",
    route: req.originalUrl
  });
});

module.exports = app;