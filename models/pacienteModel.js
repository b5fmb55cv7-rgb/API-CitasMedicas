const conexion = require("../config/conexion");

const Paciente = {

    obtenerTodos(callback) {
        conexion.query("SELECT * FROM pacientes", callback);
    },

    obtenerPorId(id, callback) {
        conexion.query("SELECT * FROM pacientes WHERE id = ?", [id], callback);
    },

    crear(datos, callback) {
        conexion.query("INSERT INTO pacientes SET ?", datos, callback);
    },

    actualizar(id, datos, callback) {
        conexion.query("UPDATE pacientes SET ? WHERE id = ?", [datos, id], callback);
    },

    eliminar(id, callback) {
        conexion.query("DELETE FROM pacientes WHERE id = ?", [id], callback);
    }

};

module.exports = Paciente;
