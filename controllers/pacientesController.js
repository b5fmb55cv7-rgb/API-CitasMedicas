const conexion = require("../config/conexion");

// Obtener todos los pacientes
exports.obtenerPacientes = (req, res) => {
    conexion.query("SELECT * FROM pacientes", (error, resultados) => {
        if (error) {
            return res.status(500).json(error);
        }
        res.json(resultados);
    });
};

// Registrar paciente
exports.crearPaciente = (req, res) => {

    const { nombre, apellido, correo, telefono, edad } = req.body;

    const sql = `
        INSERT INTO pacientes
        (nombre, apellido, correo, telefono, edad)
        VALUES (?, ?, ?, ?, ?)
    `;

    conexion.query(
        sql,
        [nombre, apellido, correo, telefono, edad],
        (error, resultado) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json({
                mensaje: "Paciente registrado correctamente"
            });

        }
    );

};

// Actualizar paciente
exports.actualizarPaciente = (req, res) => {

    const id = req.params.id;

    const { nombre, apellido, correo, telefono, edad } = req.body;

    const sql = `
    UPDATE pacientes
    SET nombre=?, apellido=?, correo=?, telefono=?, edad=?
    WHERE id=?
    `;

    conexion.query(
        sql,
        [nombre, apellido, correo, telefono, edad, id],
        (error) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json({
                mensaje: "Paciente actualizado correctamente"
            });

        }
    );

};

// Eliminar paciente
exports.eliminarPaciente = (req, res) => {

    const id = req.params.id;

    conexion.query(
        "DELETE FROM pacientes WHERE id=?",
        [id],
        (error) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json({
                mensaje: "Paciente eliminado correctamente"
            });

        }
    );

};