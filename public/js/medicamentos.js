const formulario = document.getElementById("formMedicamento");
const tabla = document.getElementById("tablaMedicamentos");

let idEditar = null;

async function cargarMedicamentos() {

    const respuesta = await fetch("/api/medicamentos");
    const medicamentos = await respuesta.json();

    tabla.innerHTML = "";

    medicamentos.forEach(m => {

        tabla.innerHTML += `
        <tr>
            <td>${m.id}</td>
            <td>${m.nombre}</td>
            <td>${m.descripcion}</td>
            <td>${m.cantidad}</td>
            <td>
                <button class="btn btn-warning btn-sm"
                onclick="editar(${m.id},'${m.nombre}','${m.descripcion}',${m.cantidad})">
                Editar
                </button>

                <button class="btn btn-danger btn-sm"
                onclick="eliminar(${m.id})">
                Eliminar
                </button>
            </td>
        </tr>
        `;
    });

}

cargarMedicamentos();

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const medicamento = {
        nombre: nombre.value,
        descripcion: descripcion.value,
        cantidad: cantidad.value
    };

    if (idEditar == null) {

        await fetch("/api/medicamentos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(medicamento)
        });

    } else {

        await fetch("/api/medicamentos/" + idEditar, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(medicamento)
        });

        idEditar = null;
    }

    formulario.reset();
    cargarMedicamentos();

});

function editar(id, nombreM, descripcionM, cantidadM) {

    idEditar = id;

    nombre.value = nombreM;
    descripcion.value = descripcionM;
    cantidad.value = cantidadM;

}

async function eliminar(id) {

    if (confirm("¿Eliminar medicamento?")) {

        await fetch("/api/medicamentos/" + id, {
            method: "DELETE"
        });

        cargarMedicamentos();
    }

}