const mysql = require("mysql2");

require("dotenv").config();

const conexion = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    waitForConnections: true,
    connectionLimit: 5,
    enableKeepAlive: true,
    keepAliveInitialDelay: 10000
});

conexion.getConnection((error, conn) => {
    if (error) {
        console.error("❌ Error de conexión:", error.message);
    } else {
        console.log("✅ Base de datos conectada correctamente.");
        conn.release();
    }
});

module.exports = conexion;