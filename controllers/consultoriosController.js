const conexion = require("../config/conexion");

// Listar
exports.listar = (req, res) => {

    conexion.query("SELECT * FROM consultorios", (error, resultados) => {

        if (error) return res.status(500).json(error);

        res.json(resultados);

    });

};

// Guardar
exports.guardar = (req, res) => {

    conexion.query("INSERT INTO consultorios SET ?", req.body, (error) => {

        if (error) return res.status(500).json(error);

        res.json({
            mensaje: "Consultorio registrado correctamente"
        });

    });

};

// Actualizar
exports.actualizar = (req, res) => {

    conexion.query(

        "UPDATE consultorios SET ? WHERE id=?",

        [req.body, req.params.id],

        (error) => {

            if (error) return res.status(500).json(error);

            res.json({
                mensaje: "Consultorio actualizado"
            });

        }

    );

};

// Eliminar
exports.eliminar = (req, res) => {

    conexion.query(

        "DELETE FROM consultorios WHERE id=?",

        [req.params.id],

        (error) => {

            if (error) return res.status(500).json(error);

            res.json({
                mensaje: "Consultorio eliminado"
            });

        }

    );

};