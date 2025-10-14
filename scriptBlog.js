const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');
const botonesServicios = document.querySelector('.botonesServicios');
const imagenesServicios = document.querySelector('.imagenesServicios');

navbarToggle.addEventListener('click', () =>{
    navbarToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
});