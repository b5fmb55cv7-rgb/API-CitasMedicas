const express = require("express");
const router = express.Router();

const consultoriosController = require("../controllers/consultoriosController");

router.get("/", consultoriosController.listar);
router.post("/", consultoriosController.guardar);
router.put("/:id", consultoriosController.actualizar);
router.delete("/:id", consultoriosController.eliminar);

module.exports = router;