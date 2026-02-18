const express = require("express");
const router = express.Router();

// Simulation de base de données ou appel Mongoose
router.post("/users", (req, res) => {
  const { username, email, role } = req.body;

  // On crée un objet qui a EXACTEMENT la même structure que le GET
  const newUser = {
    id: "65a1b2c3d4e5f6g7h8i9j0", // Dans la vraie vie : user._id
    username: username,
    email: email,
    role: role || "user"
  };

  res.status(201).json(newUser); 
});

router.get("/users", (req, res) => {
  res.json([{ 
    id: "65a1b2c3d4e5f6g7h8i9j0", 
    username: "Mamadou", 
    email: "test@test.com", 
    role: "admin" 
  }]);
});

module.exports = router;