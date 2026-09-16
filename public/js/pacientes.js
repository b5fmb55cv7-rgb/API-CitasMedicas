const formulario = document.getElementById("formPaciente");
const tabla = document.getElementById("tablaPacientes");

let idEditar = null;

async function cargarPacientes() {

    const respuesta = await fetch("/pacientes");
    const pacientes = await respuesta.json();

    tabla.innerHTML = "";

    pacientes.forEach(p => {

        tabla.innerHTML += `
        <tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.correo}</td>
            <td>${p.telefono}</td>
            <td>
                <button class="btn btn-warning btn-sm"
                onclick="editar(${p.id},'${p.nombre}','${p.correo}','${p.telefono}')">
                Editar
                </button>

                <button class="btn btn-danger btn-sm"
                onclick="eliminar(${p.id})">
                Eliminar
                </button>
            </td>
        </tr>
        `;
    });

}

cargarPacientes();

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const paciente = {
    nombre: nombre.value,
    apellido: apellido.value,
    documento: documento.value,
    correo: correo.value,
    telefono: telefono.value,
    direccion: direccion.value,
    edad: edad.value
};

    if (idEditar == null) {

        await fetch("/pacientes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paciente)
        });

    } else {

        await fetch("/pacientes/" + idEditar, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(paciente)
        });

        idEditar = null;
    }

    formulario.reset();
    cargarPacientes();

});

function editar(id, nombreP, correoP, telefonoP) {

    idEditar = id;

    nombre.value = nombreP;
    correo.value = correoP;
    telefono.value = telefonoP;

}

async function eliminar(id) {

    if (confirm("¿Eliminar paciente?")) {

        await fetch("/pacientes/" + id, {
            method: "DELETE"
        });

        cargarPacientes();
    }

}