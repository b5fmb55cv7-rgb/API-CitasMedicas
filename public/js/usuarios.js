const formulario = document.getElementById("formUsuario");
const tabla = document.getElementById("tablaUsuarios");

let idEditar = null;

// Cargar usuarios
async function cargarUsuarios() {

    const respuesta = await fetch("/api/usuarios");
    const usuarios = await respuesta.json();

    tabla.innerHTML = "";

    usuarios.forEach(usuario => {

        tabla.innerHTML += `
        <tr>
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.correo}</td>
            <td>${usuario.rol}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editar(${usuario.id}, '${usuario.nombre}', '${usuario.correo}', '${usuario.password}', '${usuario.rol}')">
                    Editar
                </button>

                <button class="btn btn-danger btn-sm" onclick="eliminar(${usuario.id})">
                    Eliminar
                </button>
            </td>
        </tr>
        `;

    });

}

cargarUsuarios();

// Guardar
formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const usuario = {

        nombre: document.getElementById("nombre").value,
        correo: document.getElementById("correo").value,
        password: document.getElementById("password").value,
        rol: document.getElementById("rol").value

    };

    if(idEditar === null){

        await fetch("/api/usuarios",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(usuario)

        });

    }else{

        await fetch("/api/usuarios/"+idEditar,{

            method:"PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(usuario)

        });

        idEditar = null;

    }

    formulario.reset();

    cargarUsuarios();

});

// Editar
function editar(id,nombre,correo,password,rol){

    idEditar=id;

    document.getElementById("nombre").value=nombre;
    document.getElementById("correo").value=correo;
    document.getElementById("password").value=password;
    document.getElementById("rol").value=rol;

}

// Eliminar
async function eliminar(id){

    if(confirm("¿Eliminar usuario?")){

        await fetch("/api/usuarios/"+id,{

            method:"DELETE"

        });

        cargarUsuarios();

    }

}