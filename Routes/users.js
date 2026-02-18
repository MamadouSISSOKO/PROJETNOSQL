const produitRouter = require('./rooms.js');
const express = require("express");
const router = express.Router();
module.exports = (app) => {
  app.use('/produits', produitRouter);
};


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Récupérer la liste des utilisateurs
 *     responses:
 *       200:
 *         description: Succès
 */
router.get("/users", (req, res) => {
  res.json([{ id: 1, name: "Mamadou" }]);
});

module.exports = router;