const formulario = document.getElementById("formPaciente");
const tabla = document.getElementById("tablaPacientes");

let idEditar = null;

async function cargarPacientes() {

    const respuesta = await fetch("/pacientes");
    const pacientes = await respuesta.json();

    tabla.innerHTML = "";

    // Crear header si no existe
    if (!tabla.querySelector("thead")) {
        const thead = document.createElement("thead");
        thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Documento</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Edad</th>
            <th>Acciones</th>
        </tr>
        `;
        tabla.parentElement.insertBefore(thead, tabla);
    }

    pacientes.forEach(p => {

        tabla.innerHTML += `
        <tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.apellido}</td>
            <td>${p.documento}</td>
            <td>${p.correo}</td>
            <td>${p.telefono}</td>
            <td>${p.direccion}</td>
            <td>${p.edad}</td>
            <td>
                <button class="btn btn-warning btn-sm"
                onclick="editar(${p.id},'${p.nombre}','${p.apellido}','${p.documento}','${p.correo}','${p.telefono}','${p.direccion}',${p.edad})">
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

function editar(id, nombreP, apellidoP, documentoP, correoP, telefonoP, direccionP, edadP) {

    idEditar = id;

    nombre.value = nombreP;
    apellido.value = apellidoP;
    documento.value = documentoP;
    correo.value = correoP;
    telefono.value = telefonoP;
    direccion.value = direccionP;
    edad.value = edadP;

}

async function eliminar(id) {

    if (confirm("¿Eliminar paciente?")) {

        await fetch("/pacientes/" + id, {
            method: "DELETE"
        });

        cargarPacientes();
    }

}