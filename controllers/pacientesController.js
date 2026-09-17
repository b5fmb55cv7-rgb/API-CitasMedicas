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

// Obtener un paciente por ID
exports.obtenerPaciente = (req, res) => {

    conexion.query(
        "SELECT * FROM pacientes WHERE id = ?",
        [req.params.id],
        (error, resultados) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json(resultados);

        }
    );

};

// Crear paciente
exports.crearPaciente = (req, res) => {

    const paciente = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        documento: req.body.documento,
        correo: req.body.correo,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        edad: req.body.edad
    };

    conexion.query(
        "INSERT INTO pacientes SET ?",
        paciente,
        (error, resultado) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json({
                mensaje: "Paciente registrado correctamente",
                id: resultado.insertId
            });

        }
    );

};

// Actualizar paciente
exports.actualizarPaciente = (req, res) => {

    conexion.query(
        "UPDATE pacientes SET ? WHERE id = ?",
        [req.body, req.params.id],
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

    conexion.query(
        "DELETE FROM pacientes WHERE id = ?",
        [req.params.id],
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