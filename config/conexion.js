const mysql = require("mysql2");

const conexion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "citas_medicas"
});

conexion.connect((error) => {
    if (error) {
        console.log("Error de conexión:", error);
    } else {
        console.log("Conectado a la base de datos");
    }
});

module.exports = conexion;