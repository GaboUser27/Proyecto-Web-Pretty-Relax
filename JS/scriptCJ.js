const fechaInput = document.getElementById('fecha');
const today = new Date();
const year = today.getFullYear();

// Formatear fecha actual en formato YYYY-MM-DD
const todayFormatted = today.toISOString().split('T')[0];

// Establecer límites
fechaInput.min = todayFormatted; // Hoy como mínimo
fechaInput.max = `${year}-12-31`; // Fin del año actual

//JSON servicios
const select = document.getElementById('grado');

fetch('JSON/servicios.json')
    .then(response => response.json())
    .then(servicios => {
        servicios.forEach(servicio => {
            const option = document.createElement('option');
            option.value = servicio.nombre;
            option.textContent = `${servicio.nombre} - $${servicio.precio}`;
            select.appendChild(option);
        });
    })
    .catch(error => console.error('Error cargando servicios:', error));

