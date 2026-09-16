const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", require("./routes/usuarios"));

// Archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Vistas
app.use("/vistas", express.static(path.join(__dirname, "views")));

require("./config/conexion");

// Ruta principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

// Página de pacientes
app.get("/pacientes.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "pacientes.html"));
});

// Rutas pacientes
app.use("/pacientes", require("./routes/pacientes"));

app.use("/api/medicos", require("./routes/medicos"));
app.use("/api/consultorios", require("./routes/consultorios"));
// app.use("/api/medicamentos", require("./routes/medicamentos"));
app.use("/api/tratamientos", require("./routes/tratamientos"));
app.use("/api/citas", require("./routes/citas"));

const PUERTO = process.env.PORT || 3000;



app.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
});