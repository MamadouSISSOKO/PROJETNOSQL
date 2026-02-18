const express = require("express");
const router = express.Router();
const Reservation = require("../Models/Reservation");

// GET : Récupérer toutes les réservations avec les détails inclus
router.get("/reservations", async (req, res) => {
  try {
    // .populate permet de remplacer l'ID par l'objet complet (nom, email, etc.)
    const reservations = await Reservation.find()
      .populate("userId", "username email")
      .populate("roomId", "name pricePerNight");
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

// POST : Créer une réservation réelle
router.post("/reservations", async (req, res) => {
  try {
    const { userId, roomId, startDate, endDate, totalPrice } = req.body;

    const newReservation = new Reservation({
      userId,
      roomId,
      startDate,
      endDate,
      totalPrice
    });

    const savedReservation = await newReservation.save();
    
    // On renvoie la réservation avec son ID unique
    res.status(201).json(savedReservation);
  } catch (err) {
    res.status(400).json({ message: "Impossible de réserver", error: err.message });
  }
});

module.exports = router;