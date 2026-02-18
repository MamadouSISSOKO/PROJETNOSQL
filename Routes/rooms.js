const express = require("express");
const router = express.Router();

// Cette route répondra à GET https://.../api/rooms
router.get("/rooms", (req, res) => {
  res.json([
    { id: "1", name: "Suite Royale", price: 150 },
    { id: "2", name: "Chambre Standard", price: 80 }
  ]);
});

// Route pour créer une chambre
router.post("/rooms", (req, res) => {
  const newRoom = req.body;
  res.status(201).json({ message: "Chambre ajoutée !", data: newRoom });
});

module.exports = router;