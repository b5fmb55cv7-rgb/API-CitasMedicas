const conexion = require("../config/conexion");

// LOGIN
exports.login = (req, res) => {

    const { correo, password } = req.body;

    const sql = "SELECT * FROM usuarios WHERE correo = ? AND password = ?";

    conexion.query(sql, [correo, password], (error, resultados) => {

        if (error) {
            return res.status(500).json({
                mensaje: "Error del servidor"
            });
        }

        if (resultados.length === 0) {
            return res.status(401).json({
                mensaje: "Correo o contraseña incorrectos"
            });
        }

        res.json({
            mensaje: "Login correcto",
            usuario: resultados[0]
        });

    });

};

// LISTAR
exports.listar = (req, res) => {

    conexion.query("SELECT * FROM usuarios", (error, resultados) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json(resultados);

    });

};

// GUARDAR
exports.guardar = (req, res) => {

    conexion.query("INSERT INTO usuarios SET ?", req.body, (error) => {

        if (error) {
            return res.status(500).json(error);
        }

        res.json({
            mensaje: "Usuario registrado correctamente"
        });

    });

};

// ACTUALIZAR
exports.actualizar = (req, res) => {

    conexion.query(
        "UPDATE usuarios SET ? WHERE id = ?",
        [req.body, req.params.id],
        (error) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json({
                mensaje: "Usuario actualizado correctamente"
            });

        }
    );

};

// ELIMINAR
exports.eliminar = (req, res) => {

    conexion.query(
        "DELETE FROM usuarios WHERE id = ?",
        [req.params.id],
        (error) => {

            if (error) {
                return res.status(500).json(error);
            }

            res.json({
                mensaje: "Usuario eliminado correctamente"
            });

        }
    );

};