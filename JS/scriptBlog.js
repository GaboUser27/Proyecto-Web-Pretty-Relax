const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const botonesServiciosC = document.querySelectorAll(".botonesServicios button");
const imagenesServiciosC = document.querySelectorAll(".imagenesServicios .imagen");
const botonesEtiquetas = document.querySelectorAll(".botonesEtiquetas button");

navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

//La funcion de selección por categoria de las imagenes

const imagenesFiltro = e => {
    botonesServiciosC.forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    //Filtrar imágenes
    imagenesServiciosC.forEach(imagen => {
        imagen.classList.add("hide");
        if (imagen.dataset.name === e.target.dataset.name || e.target.dataset.name === "todo") {
            imagen.classList.remove("hide");
        }
    });

    //Filtrar botones de etiquetas
    botonesEtiquetas.forEach(button => {
        button.classList.add("hide");
        if (button.dataset.name === e.target.dataset.name || e.target.dataset.name === "todo") {
            button.classList.remove("hide");
        }
    });
};

botonesServiciosC.forEach(button => button.addEventListener("click", imagenesFiltro));

//Filtrado para etiquetas
let etiquetasSeleccionadas = [];

const filtrarPorEtiquetas = () => {
    const imagenes = document.querySelectorAll(".imagenesServicios .imagen");

    // Si no hay etiquetas seleccionadas, mostrar todas
    if (etiquetasSeleccionadas.length === 0) {
        imagenes.forEach(imagen => imagen.classList.remove("hide"));
        return;
    }

    // Si hay etiquetas seleccionadas, filtrar
    imagenes.forEach(imagen => {
        const titulo = imagen.querySelector(".tituloImagen").textContent.toLowerCase();
        const texto = imagen.querySelector(".textoImagen").textContent.toLowerCase();

        imagen.classList.add("hide"); // Ocultar por defecto

        for (let keyword of etiquetasSeleccionadas) {
            if (titulo.includes(keyword) || texto.includes(keyword)) {
                imagen.classList.remove("hide");
                break; // Si coincide con una, no sigue buscando
            }
        }
    });
};

botonesEtiquetas.forEach(button => {
    button.addEventListener("click", e => {
        const keyword = e.target.dataset.keyword.toLowerCase();

        // Alternar selección
        if (etiquetasSeleccionadas.includes(keyword)) {
            etiquetasSeleccionadas = etiquetasSeleccionadas.filter(k => k !== keyword);
            e.target.classList.remove("active");
        } else {
            etiquetasSeleccionadas.push(keyword);
            e.target.classList.add("active");
        }

        filtrarPorEtiquetas();
    });
});