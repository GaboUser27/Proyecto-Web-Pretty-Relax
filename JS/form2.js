
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("formContacto");
    const btn = document.getElementById("button");

    form.addEventListener("submit", function (e) {
        const captcha = grecaptcha.getResponse();
        if (!captcha) {
            mostrarModal("⚠️ Por favor completá el CAPTCHA.");
            btn.value = "Enviar";
            return;
        }
        e.preventDefault();
        btn.value = "Enviando...";

        const serviceID = "default_service";
        const templateID = "template_8ye4s22";

        emailjs.sendForm(serviceID, templateID, form)
            .then(() => {
                btn.value = "Enviar Correo";
                mostrarModal("✅ ¡Formulario enviado correctamente!", obtenerDatosFormulario());
                form.reset();
            })
            .catch((err) => {
                btn.value = "Enviar Correo";
                mostrarModal("❌ Error al enviar: " + JSON.stringify(err));
            });
    });

    function mostrarModal(mensaje, datosHTML = "") {
        document.getElementById("modalMensaje").innerHTML = `
            <p>${mensaje}</p>
            ${datosHTML}
        `;
        const modal = new bootstrap.Modal(document.getElementById('miModal'));
        modal.show();
    }

    function obtenerDatosFormulario() {
        const email = document.getElementById("email").value;
        const asunto = document.getElementById("asunto").value;
        const mensaje = document.getElementById("mensaje").value;
        const genero = document.querySelector('input[name="genero"]:checked')?.value || "";

        return `
            <hr>
            <h6>Resumen de datos:</h6>
            <div class="row">
                <div class="col-md-6 mb-2">
                    <label class="form-label"><strong>Email:</strong></label>
                    <input type="text" class="form-control" value="${email}" readonly>
                </div>
                <div class="col-md-6 mb-2">
                    <label class="form-label"><strong>Asunto:</strong></label>
                    <input type="text" class="form-control" value="${asunto}" readonly>
                </div>
                <div class="col-md-6 mb-2">
                    <label class="form-label"><strong>Género:</strong></label>
                    <input type="text" class="form-control" value="${genero}" readonly>
                </div>
            </div>
            <div class="mb-2">
                <label class="form-label"><strong>Mensaje:</strong></label>
                <textarea class="form-control" style="text-align: justify;" rows="4" readonly>${mensaje}</textarea>
            </div>
        `;
    }

    // Reinicio capchat cuando se cierra el modal
    document.getElementById('miModal').addEventListener('hidden.bs.modal', function () {
        grecaptcha.reset();
    });
});

function habilitarBoton() {
    document.getElementById("button").disabled = false;
}
