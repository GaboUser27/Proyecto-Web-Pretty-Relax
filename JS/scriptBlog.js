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
    
    const categoriaActiva = e.target.dataset.name;

    // Si la categoría es "todo", limpiar etiquetas seleccionadas
    if (categoriaActiva === "todo") {
        etiquetasSeleccionadas = [];
        botonesEtiquetas.forEach(button => button.classList.remove("active"));
    }

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
    const categoriaActiva = document.querySelector(".botonesServicios button.active")?.dataset.name;

    imagenes.forEach(imagen => {
        const titulo = imagen.querySelector(".tituloImagen").textContent.toLowerCase();
        const texto = imagen.querySelector(".textoImagen").textContent.toLowerCase();
        const categoriaImagen = imagen.dataset.name;

        // Ocultar por defecto
        imagen.classList.add("hide");

        // Condición: debe coincidir con la categoría activa (o "todo") y con alguna etiqueta seleccionada
        if ((!categoriaActiva || categoriaActiva === "todo" || categoriaImagen === categoriaActiva)) {
            if (etiquetasSeleccionadas.length === 0) {
                // Si no hay etiquetas, mostrar solo las de la categoría activa
                imagen.classList.remove("hide");
            } else {
                // Si hay etiquetas, mostrar solo si coincide con alguna
                for (let keyword of etiquetasSeleccionadas) {
                    if (titulo.includes(keyword) || texto.includes(keyword)) {
                        imagen.classList.remove("hide");
                        break;
                    }
                }
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