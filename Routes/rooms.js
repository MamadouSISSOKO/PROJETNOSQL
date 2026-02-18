const express = require("express");
const router = express.Router();
const Room = require("../Models/Room"); // Import du modèle

// GET : Récupérer la liste réelle des chambres
router.get("/rooms", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// POST : Ajouter une chambre en base de données
router.post("/rooms", async (req, res) => {
  try {
    const { name, capacity, pricePerNight, isAvailable } = req.body;

    const newRoom = new Room({
      name,
      capacity,
      pricePerNight,
      isAvailable
    });

    const savedRoom = await newRoom.save();
    
    // On renvoie l'objet complet avec son ID généré par MongoDB
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de l'ajout", error: err.message });
  }
});

module.exports = router;