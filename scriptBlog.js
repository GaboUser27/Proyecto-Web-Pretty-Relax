const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const botonesServiciosC = document.querySelectorAll(".botonesServicios button");
const imagenesServiciosC = document.querySelectorAll(".imagenesServicios .imagen");

//Listener para ver cual boton está activo en el header
navbarToggle.addEventListener('click', () => {
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});

//La funcion de selección por categoria de las imagenes
const imagenesFiltro = e => {
    botonesServiciosC.forEach(btn => btn.classList.remove("active"));
    e.target.classList.add("active");

    //Iteramos entre imagenes
    imagenesServiciosC.forEach(imagen => {
        imagen.classList.add("hide");

        if(imagen.dataset.name === e.target.dataset.name || e.target.dataset.name === "todo"){
            imagen.classList.remove("hide");
        }
    });
};

//Listener en base a los botones
botonesServiciosC.forEach(button => button.addEventListener("click", imagenesFiltro));