const conexion = require("../config/conexion");

// Listar
exports.listar = (req,res)=>{

    conexion.query("SELECT * FROM medicos",(error,resultados)=>{

        if(error) return res.status(500).json(error);

        res.json(resultados);

    });

};

// Guardar
exports.guardar=(req,res)=>{

    conexion.query("INSERT INTO medicos SET ?",req.body,(error)=>{

        if(error) return res.status(500).json(error);

        res.json({mensaje:"Médico registrado correctamente"});

    });

};

// Actualizar
exports.actualizar=(req,res)=>{

    conexion.query(

        "UPDATE medicos SET ? WHERE id=?",

        [req.body,req.params.id],

        (error)=>{

            if(error) return res.status(500).json(error);

            res.json({mensaje:"Médico actualizado"});

        }

    );

};

// Eliminar
exports.eliminar=(req,res)=>{

    conexion.query(

        "DELETE FROM medicos WHERE id=?",

        [req.params.id],

        (error)=>{

            if(error) return res.status(500).json(error);

            res.json({mensaje:"Médico eliminado"});

        }

    );

};