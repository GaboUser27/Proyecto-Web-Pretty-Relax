const estrellas = document.querySelectorAll('.estrellas span');
let calificacion = 0;

// Selección de estrellas
estrellas.forEach(estrella => {
    estrella.addEventListener('click', () => {
        calificacion = estrella.getAttribute('data-valor');
        estrellas.forEach(e => e.classList.remove('seleccionada'));
        for (let i = 0; i < calificacion; i++) {
            estrellas[i].classList.add('seleccionada');
        }
    });
});

// Cargar comentarios guardados
document.addEventListener('DOMContentLoaded', () => {
    const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentariosGuardados.forEach(c => mostrarComentario(c.nombre, c.comentario, c.calificacion));
});

// Manejo del formulario
document.getElementById('form-comentario').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const comentario = document.getElementById('comentario').value;

    if (calificacion === 0) {
        alert('Por favor selecciona una calificación con estrellas.');
        return;
    }

    const nuevoComentario = { nombre, comentario, calificacion: parseInt(calificacion) };
    const comentariosGuardados = JSON.parse(localStorage.getItem('comentarios')) || [];
    comentariosGuardados.push(nuevoComentario);
    localStorage.setItem('comentarios', JSON.stringify(comentariosGuardados));

    mostrarComentario(nombre, comentario, calificacion);

    this.reset();
    estrellas.forEach(e => e.classList.remove('seleccionada'));
    calificacion = 0;
});

// Función para mostrar comentario
function mostrarComentario(nombre, comentario, calificacion) {
    const contenedor = document.createElement('div');
    contenedor.classList.add('comentario-box');
    contenedor.innerHTML = `
        <div class="comentario-header">
            <strong>${nombre}</strong>
            <div class="estrellas-mostradas">${'★'.repeat(calificacion)}${'☆'.repeat(5 - calificacion)}</div>
        </div>
        <p>${comentario}</p>
    `;
    document.getElementById('lista-comentarios').appendChild(contenedor);
}