const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

router.post("/login", usuariosController.login);

router.get("/usuarios", usuariosController.listar);
router.post("/usuarios", usuariosController.guardar);
router.put("/usuarios/:id", usuariosController.actualizar);
router.delete("/usuarios/:id", usuariosController.eliminar);

module.exports = router;