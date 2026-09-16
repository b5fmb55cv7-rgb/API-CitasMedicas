const express = require("express");

const router = express.Router();

const pacientes = require("../controllers/pacientesController");

router.get("/", pacientes.obtenerPacientes);

router.get("/:id", pacientes.obtenerPaciente);

router.post("/", pacientes.crearPaciente);

router.put("/:id", pacientes.actualizarPaciente);

router.delete("/:id", pacientes.eliminarPaciente);

module.exports = router;    