const express = require("express");
const router = express.Router();

// Cette route répondra à GET https://.../api/reservations
router.get("/reservations", (req, res) => {
  res.json([
    { id: "101", userId: "1", roomId: "1", date: "2026-02-20" }
  ]);
});

// Route pour créer une réservation
router.post("/reservations", (req, res) => {
  const booking = req.body;
  // Ici tu ajouterais ta logique Mongoose pour sauvegarder
  res.status(201).json({ message: "Réservation confirmée !", booking });
});

module.exports = router;