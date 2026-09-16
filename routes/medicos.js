const express = require("express");
const router = express.Router();

const medicosController = require("../controllers/medicosController");

router.get("/", medicosController.listar);
router.post("/", medicosController.guardar);
router.put("/:id", medicosController.actualizar);
router.delete("/:id", medicosController.eliminar);

module.exports = router;