const formulario = document.getElementById("formMedico");
const tabla = document.getElementById("tablaMedicos");

let idEditar = null;

// Listar médicos
async function cargarMedicos() {

    const respuesta = await fetch("/api/medicos");
    const medicos = await respuesta.json();

    tabla.innerHTML = "";

    medicos.forEach(medico => {

        tabla.innerHTML += `
        <tr>
            <td>${medico.id}</td>
            <td>${medico.nombre}</td>
            <td>${medico.especialidad}</td>
            <td>${medico.correo}</td>
            <td>${medico.telefono}</td>
            <td>
                <button class="btn btn-warning btn-sm"
                onclick="editar(${medico.id},'${medico.nombre}','${medico.especialidad}','${medico.correo}','${medico.telefono}')">
                Editar
                </button>

                <button class="btn btn-danger btn-sm"
                onclick="eliminar(${medico.id})">
                Eliminar
                </button>
            </td>
        </tr>
        `;

    });

}

cargarMedicos();

// Guardar o actualizar
formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const medico = {

        nombre: document.getElementById("nombre").value,
        especialidad: document.getElementById("especialidad").value,
        correo: document.getElementById("correo").value,
        telefono: document.getElementById("telefono").value

    };

    if (idEditar == null) {

        await fetch("/api/medicos", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(medico)

        });

    } else {

        await fetch("/api/medicos/" + idEditar, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(medico)

        });

        idEditar = null;

    }

    formulario.reset();

    cargarMedicos();

});

// Editar
function editar(id, nombre, especialidad, correo, telefono) {

    idEditar = id;

    document.getElementById("nombre").value = nombre;
    document.getElementById("especialidad").value = especialidad;
    document.getElementById("correo").value = correo;
    document.getElementById("telefono").value = telefono;

}

// Eliminar
async function eliminar(id) {

    if (confirm("¿Desea eliminar este médico?")) {

        await fetch("/api/medicos/" + id, {

            method: "DELETE"

        });

        cargarMedicos();

    }

}