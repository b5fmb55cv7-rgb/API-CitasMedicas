const express = require("express");
const router = express.Router();

const tratamientosController = require("../controllers/tratamientosController");

router.get("/", tratamientosController.listar);
router.post("/", tratamientosController.guardar);
router.put("/:id", tratamientosController.actualizar);
router.delete("/:id", tratamientosController.eliminar);

module.exports = router;