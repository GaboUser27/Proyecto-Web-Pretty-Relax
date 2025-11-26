// Selecciona el contenedor donde van las cards
const contenedor = document.querySelector("#contenedor-servicios");

// Recorre el array y genera las cards
serviciosDestacados.forEach((servicio, index) => {
    const col = document.createElement("div");
    col.className = "col-12 col-md-3";
const cardHTML = `
    <div class="card text-white border-0 CardDestacado CD-${index + 1} style=  justify-content: center;"
        style="
            height: 350px;
            border-radius: 15px;
            background-image: url('${servicio.imagen}');
            background-size: cover;
            background-position: center;
            position: relative;
            overflow: hidden;
        ">

        <div style="
            position: absolute;
            bottom: 0; left: 0; right: 0;
            height: 55%;
            background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
            z-index: 1;
        "></div>

        <div class="card-body d-flex flex-column justify-content-end"
            style="
                position: absolute;
                bottom: 0; left: 0; right: 0;
                z-index: 2;
                padding: 20px;
            ">
            
            <h5 class="card-title"
                style="font-size: 1.3rem; font-weight: 600; margin-bottom: 5px;">
                ${servicio.titulo}
            </h5>

            <p class="card-text"
                style="
                    font-size: 0.95rem;
                    height: 50px;
                    overflow: hidden;
                    margin-bottom: 10px;
                ">
                ${servicio.descripcion}
            </p>

            <a href="${servicio.enlace}"
                class="btn btn-outline-light btn-sm mt-2"
                style="
                    width: 100%;
                    border-radius: 30px;
                    backdrop-filter: blur(2px);
                ">
                Ver más
            </a>
        </div>
    </div>
`;


    col.innerHTML = cardHTML;
    contenedor.appendChild(col);
});
