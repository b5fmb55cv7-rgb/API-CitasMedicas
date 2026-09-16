const conexion = require("../config/conexion");

// Listar
exports.listar = (req, res) => {

    conexion.query("SELECT * FROM tratamientos", (error, resultados) => {

        if (error) return res.status(500).json(error);

        res.json(resultados);

    });

};

// Guardar
exports.guardar = (req, res) => {

    conexion.query("INSERT INTO tratamientos SET ?", req.body, (error) => {

        if (error) return res.status(500).json(error);

        res.json({
            mensaje: "Tratamiento registrado correctamente"
        });

    });

};

// Actualizar
exports.actualizar = (req, res) => {

    conexion.query(

        "UPDATE tratamientos SET ? WHERE id=?",

        [req.body, req.params.id],

        (error) => {

            if (error) return res.status(500).json(error);

            res.json({
                mensaje: "Tratamiento actualizado"
            });

        }

    );

};

// Eliminar
exports.eliminar = (req, res) => {

    conexion.query(

        "DELETE FROM tratamientos WHERE id=?",

        [req.params.id],

        (error) => {

            if (error) return res.status(500).json(error);

            res.json({
                mensaje: "Tratamiento eliminado"
            });

        }

    );

};