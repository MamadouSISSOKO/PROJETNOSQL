const express = require("express");
const router = express.Router();

// CORRECTIF : Passage en minuscules pour correspondre à ton dossier 'models/room'
const Room = require("../models/room"); 

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
      isAvailable: isAvailable !== undefined ? isAvailable : true
    });

    const savedRoom = await newRoom.save();
    
    // Renvoie l'objet avec l'ID généré (sera 'id' si le virtual est configuré dans le modèle)
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de l'ajout", error: err.message });
  }
});

module.exports = router;