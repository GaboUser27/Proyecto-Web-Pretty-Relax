
document.addEventListener('DOMContentLoaded', () => {
    fetch('JSON/acercaDe.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('descripcion').textContent = data.descripcion;

            const teamGrid = document.getElementById('team-grid');
            data.equipo.forEach(persona => {
                const card = document.createElement('article');
                card.classList.add('team-card');


                card.innerHTML = `

                <article class="team-card">
                    <div class="team-card__media">
                        <img src="${persona.imagen}" alt="${persona.nombre}"
                            class="team-card__image">
                    </div>
                    <div class="team-card__body">
                        <h3 class="team-card__name">${persona.nombre} - ${persona.cedula}</h3>
                        <p class="team-card__role">
                            ${persona.carrera} ${persona.universidad}
                        </p>
                        <p class="team-card__desc">
                            ${persona.rol}
                        </p>
                    </div>
                </article>
                `;


                teamGrid.appendChild(card);
            });
        })
        .catch(error => console.error('Error al cargar el JSON:', error));
});
