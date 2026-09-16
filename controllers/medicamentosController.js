const conexion = require("../config/conexion");

// Listar
exports.listar = (req, res) => {

    conexion.query("SELECT * FROM medicamentos", (error, resultados) => {

        if (error) return res.status(500).json(error);

        res.json(resultados);

    });

};

// Guardar
exports.guardar = (req, res) => {

    conexion.query("INSERT INTO medicamentos SET ?", req.body, (error) => {

        if (error) return res.status(500).json(error);

        res.json({
            mensaje: "Medicamento registrado correctamente"
        });

    });

};

// Actualizar
exports.actualizar = (req, res) => {

    conexion.query(

        "UPDATE medicamentos SET ? WHERE id=?",

        [req.body, req.params.id],

        (error) => {

            if (error) return res.status(500).json(error);

            res.json({
                mensaje: "Medicamento actualizado"
            });

        }

    );

};

// Eliminar
exports.eliminar = (req, res) => {

    conexion.query(

        "DELETE FROM medicamentos WHERE id=?",

        [req.params.id],

        (error) => {

            if (error) return res.status(500).json(error);

            res.json({
                mensaje: "Medicamento eliminado"
            });

        }

    );

};