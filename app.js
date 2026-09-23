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

// Página de login
app.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "login.html"));
});

// Página del dashboard
app.get("/dashboard.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

// Página de pacientes
app.get("/pacientes.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "pacientes.html"));
});

// Página de médicos
app.get("/medicos.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "medicos.html"));
});

// Página de consultorios
app.get("/consultorios.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "consultorios.html"));
});

// Página de medicamentos
app.get("/medicamentos.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "medicamentos.html"));
});

// Página de tratamientos
app.get("/tratamientos.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "tratamientos.html"));
});

// Página de citas
app.get("/citas.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "citas.html"));
});

// Página de usuarios
app.get("/usuarios.html", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "usuarios.html"));
});

// Rutas pacientes
app.use("/pacientes", require("./routes/pacientes"));

// Rutas API
app.use("/api/medicos", require("./routes/medicos"));
app.use("/api/consultorios", require("./routes/consultorios"));
app.use("/api/medicamentos", require("./routes/medicamentos"));
app.use("/api/tratamientos", require("./routes/tratamientos"));
app.use("/api/citas", require("./routes/citas"));

const PUERTO = process.env.PORT || 3000;

app.listen(PUERTO, () => {
    console.log(`Servidor ejecutándose en el puerto ${PUERTO}`);
});