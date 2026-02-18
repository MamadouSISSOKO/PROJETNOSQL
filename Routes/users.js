const express = require("express");
const router = express.Router();

// La route reste fonctionnelle, mais on retire le bloc @swagger qui fait planter Render
router.get("/users", (req, res) => {
  res.json([{ id: 1, name: "Mamadou" }]);
});

module.exports = router;