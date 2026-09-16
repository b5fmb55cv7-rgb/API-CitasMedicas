const formulario = document.getElementById("formTratamiento");
const tabla = document.getElementById("tablaTratamientos");

let idEditar = null;

async function cargarTratamientos() {

    const respuesta = await fetch("/api/tratamientos");
    const tratamientos = await respuesta.json();

    tabla.innerHTML = "";

    tratamientos.forEach(t => {

        tabla.innerHTML += `
        <tr>
            <td>${t.id}</td>
            <td>${t.nombre}</td>
            <td>${t.descripcion}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editar(${t.id},'${t.nombre}','${t.descripcion}')">Editar</button>

                <button class="btn btn-danger btn-sm" onclick="eliminar(${t.id})">Eliminar</button>
            </td>
        </tr>
        `;

    });

}

cargarTratamientos();

formulario.addEventListener("submit", async (e) => {

    e.preventDefault();

    const tratamiento = {

        nombre: nombre.value,
        descripcion: descripcion.value

    };

    if (idEditar == null) {

        await fetch("/api/tratamientos", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(tratamiento)

        });

    } else {

        await fetch("/api/tratamientos/" + idEditar, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(tratamiento)

        });

        idEditar = null;

    }

    formulario.reset();

    cargarTratamientos();

});

function editar(id, nombreT, descripcionT) {

    idEditar = id;

    nombre.value = nombreT;
    descripcion.value = descripcionT;

}

async function eliminar(id) {

    if (confirm("¿Eliminar tratamiento?")) {

        await fetch("/api/tratamientos/" + id, {

            method: "DELETE"

        });

        cargarTratamientos();

    }

}