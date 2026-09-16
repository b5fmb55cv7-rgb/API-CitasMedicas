document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("formLogin");

    formulario.addEventListener("submit", async (e) => {

        e.preventDefault();

        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value.trim();

        try {

            const respuesta = await fetch("/api/login", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    correo,
                    password
                })

            });

            const datos = await respuesta.json();

            if (respuesta.ok) {

                localStorage.setItem("usuario", JSON.stringify(datos.usuario));

                alert("Bienvenido " + datos.usuario.nombre);

                window.location.href = "/dashboard.html";

            } else {

                alert(datos.mensaje);

            }

        } catch (error) {

            console.error(error);

            alert("Error al conectar con el servidor.");

        }

    });

});