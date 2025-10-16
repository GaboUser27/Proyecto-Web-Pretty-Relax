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
