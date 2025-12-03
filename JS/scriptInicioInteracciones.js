const btnTop = document.getElementById("btnTop");
const btnWhatsApp = document.getElementById("btnWhatsApp");

window.addEventListener("scroll", () => {
    if (window.scrollY > 200) {
        btnTop.classList.add("visible");
        btnWhatsApp.classList.add("visible");
    } else {
        btnTop.classList.remove("visible");
        btnWhatsApp.classList.remove("visible");
    }
});

btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
