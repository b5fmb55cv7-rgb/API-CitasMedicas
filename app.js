const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

require("./config/conexion");

// Ruta principal
app.get("/", (req, res) => {

    res.send("API Sistema de Citas Médicas funcionando correctamente.");

});

// Rutas pacientes
app.use("/pacientes", require("./routes/pacientes"));

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {

    console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);

});