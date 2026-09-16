const formulario = document.getElementById("formConsultorio");
const tabla = document.getElementById("tablaConsultorios");

let idEditar = null;

// Listar
async function cargarConsultorios() {

    const respuesta = await fetch("/api/consultorios");
    const consultorios = await respuesta.json();

    tabla.innerHTML = "";

    consultorios.forEach(c => {

        tabla.innerHTML += `
        <tr>
            <td>${c.id}</td>
            <td>${c.nombre}</td>
            <td>${c.ubicacion}</td>
            <td>
                <button class="btn btn-warning btn-sm"
                onclick="editar(${c.id}, '${c.nombre}', '${c.ubicacion}')">
                Editar
                </button>

                <button class="btn btn-danger btn-sm"
                onclick="eliminar(${c.id})">
                Eliminar
                </button>
            </td>
        </tr>
        `;

    });

}

cargarConsultorios();

// Guardar
formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const consultorio = {
        nombre: document.getElementById("nombre").value,
        ubicacion: document.getElementById("ubicacion").value
    };

    if (idEditar == null) {

        await fetch("/api/consultorios", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(consultorio)

        });

    } else {

        await fetch("/api/consultorios/" + idEditar, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(consultorio)

        });

        idEditar = null;

    }

    formulario.reset();

    cargarConsultorios();

});

// Editar
function editar(id, nombre, ubicacion) {

    idEditar = id;

    document.getElementById("nombre").value = nombre;
    document.getElementById("ubicacion").value = ubicacion;

}

// Eliminar
async function eliminar(id) {

    if (confirm("¿Eliminar consultorio?")) {

        await fetch("/api/consultorios/" + id, {

            method: "DELETE"

        });

        cargarConsultorios();

    }

}