const express = require("express");
const router = express.Router();

// CORRECTIF : On utilise des minuscules pour correspondre à ton dossier 'models'
const User = require("../models/user"); 

// GET : Récupérer la liste réelle des utilisateurs depuis MongoDB
router.get("/users", async (req, res) => {
  try {
    const users = await User.find(); 
    res.json(users); 
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err.message });
  }
});

// POST : Créer un utilisateur
router.post("/users", async (req, res) => {
  try {
    const { username, email, role } = req.body;

    const newUser = new User({
      username,
      email,
      role: role || "user"
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser); 
  } catch (err) {
    res.status(400).json({ message: "Erreur lors de la création", error: err.message });
  }
});

module.exports = router;