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
app.use("/api", userRoutes);

// ===== MongoDB =====
if (process.env.ENV === "dev") {
  mongoose
    .connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
    .then(() => console.log("✅ MongoDB DEV connecté"))
    .catch(err => console.error("❌ MongoDB DEV erreur", err));
} else {
  mongoose
    .connect(process.env.URL)
    .then(() => console.log("✅ MongoDB PROD connecté"))
    .catch(err => console.error("❌ MongoDB PROD erreur", err));
}

// ===== 404 =====
app.use((req, res) => {
  res.status(404).json({
    message: "Route non trouvée",
    route: req.originalUrl
  });
});

// ===== Error handler =====
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message
  });
});

module.exports = app;