const express = require("express");
const router = express.Router();

const medicamentosController = require("../controllers/medicamentosController");

router.get("/", medicamentosController.listar);
router.post("/", medicamentosController.guardar);
router.put("/:id", medicamentosController.actualizar);
router.delete("/:id", medicamentosController.eliminar);

module.exports = router;