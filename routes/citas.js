const express = require("express");
const router = express.Router();

const citasController = require("../controllers/citasController");

router.get("/", citasController.listar);
router.post("/", citasController.guardar);
router.put("/:id", citasController.actualizar);
router.delete("/:id", citasController.eliminar);

module.exports = router;