document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formContacto");
    const fechaNacimiento = document.getElementById("fechaNacimiento");
    const btn = document.getElementById("button");

    // --- Prellenar mensaje si viene ?servicio= en la URL ---
    const params = new URLSearchParams(window.location.search);
    const servicio = params.get("servicio");
    if (servicio) {
        const campoMensaje = document.getElementById("mensaje");
        if (campoMensaje) {
            campoMensaje.value = decodeURIComponent(servicio);
        }
    }

    // --- Manejo del envío ---
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Evita el refresh

        // Calcular edad (opcional, SOLO si te sirve en el correo)
        const fecha = new Date(fechaNacimiento.value);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fecha.getFullYear();
        const mes = hoy.getMonth() - fecha.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
            edad--;
        }

        console.log("Edad calculada:", edad); // Por si ocupás usarla

        // Cambiar texto del botón
        btn.value = "Enviando...";

        // IDs de EmailJS
        const serviceID = "default_service";
        const templateID = "template_8ye4s22";

        // --- Enviar formulario completo (EmailJS lo recolecta automáticamente) ---
        emailjs
            .sendForm(serviceID, templateID, form)
            .then(() => {
                btn.value = "Enviar Correo";
                alert("✅ ¡Formulario enviado correctamente!");
                form.reset();
            })
            .catch((err) => {
                btn.value = "Enviar Correo";
                alert("❌ Error al enviar: " + JSON.stringify(err));
            });
    });
});
