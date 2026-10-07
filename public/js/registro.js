document.getElementById("formRegistro").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const password = document.getElementById("password").value;
    const rol = document.getElementById("rol").value;

    try {
        const respuesta = await fetch("/api/usuarios", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, correo, password })
        });

        const datos = await respuesta.json();

        if (respuesta.ok) {
            alert("Cuenta creada correctamente. Ahora puedes iniciar sesión.");
            window.location.href = "/login.html";
        } else {
            alert(datos.mensaje || "No se pudo crear la cuenta");
        }
    } catch (error) {
        alert("Error de conexión con el servidor");
    }
});