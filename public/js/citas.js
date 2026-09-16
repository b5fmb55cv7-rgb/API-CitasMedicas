const formulario = document.getElementById("formCita");
const tabla = document.getElementById("tablaCitas");

let idEditar = null;

async function cargarCitas() {

    const respuesta = await fetch("/api/citas");
    const citas = await respuesta.json();

    tabla.innerHTML = "";

    citas.forEach(c => {

        tabla.innerHTML += `
        <tr>
            <td>${c.id}</td>
            <td>${c.paciente_id}</td>
            <td>${c.medico_id}</td>
            <td>${c.consultorio_id}</td>
            <td>${c.fecha}</td>
            <td>${c.hora}</td>
            <td>${c.estado}</td>
            <td>
                <button class="btn btn-warning btn-sm"
                onclick="editar(${c.id},${c.paciente_id},${c.medico_id},${c.consultorio_id},'${c.fecha}','${c.hora}','${c.estado}')">
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

cargarCitas();

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const cita = {
        paciente_id: paciente_id.value,
        medico_id: medico_id.value,
        consultorio_id: consultorio_id.value,
        fecha: fecha.value,
        hora: hora.value,
        estado: estado.value
    };

    if (idEditar == null) {

        await fetch("/api/citas", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cita)
        });

    } else {

        await fetch("/api/citas/" + idEditar, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cita)
        });

        idEditar = null;
    }

    formulario.reset();
    cargarCitas();

});

function editar(id, paciente, medico, consultorio, fechaC, horaC, estadoC) {

    idEditar = id;

    paciente_id.value = paciente;
    medico_id.value = medico;
    consultorio_id.value = consultorio;
    fecha.value = fechaC;
    hora.value = horaC;
    estado.value = estadoC;

}

async function eliminar(id) {

    if (confirm("¿Eliminar cita?")) {

        await fetch("/api/citas/" + id, {
            method: "DELETE"
        });

        cargarCitas();
    }

}