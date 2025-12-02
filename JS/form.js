document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formContacto");
    // const fechaNacimiento = document.getElementById("fechaNacimiento");
    const btn = document.getElementById("button");
    document.getElementById("fecha").value = new Date().toLocaleString();

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
        
        const captcha = grecaptcha.getResponse();
        if (!captcha) {
            alert("⚠️ Por favor completá el CAPTCHA.");
            btn.value = "Enviar";
            return;
        }
        e.preventDefault(); // Evita el refresh
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

function habilitarBoton() {
    document.getElementById("button").disabled = false;
}
