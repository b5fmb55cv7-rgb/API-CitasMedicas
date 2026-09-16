const conexion = require("../config/conexion");

// Listar
exports.listar = (req, res) => {

    conexion.query("SELECT * FROM citas", (error, resultados) => {

        if (error) return res.status(500).json(error);

        res.json(resultados);

    });

};

// Guardar
exports.guardar = (req, res) => {

    conexion.query("INSERT INTO citas SET ?", req.body, (error) => {

        if (error) return res.status(500).json(error);

        res.json({ mensaje: "Cita registrada correctamente" });

    });

};

// Actualizar
exports.actualizar = (req, res) => {

    conexion.query(

        "UPDATE citas SET ? WHERE id=?",

        [req.body, req.params.id],

        (error) => {

            if (error) return res.status(500).json(error);

            res.json({ mensaje: "Cita actualizada" });

        }

    );

};

// Eliminar
exports.eliminar = (req, res) => {

    conexion.query(

        "DELETE FROM citas WHERE id=?",

        [req.params.id],

        (error) => {

            if (error) return res.status(500).json(error);

            res.json({ mensaje: "Cita eliminada" });

        }

    );

};