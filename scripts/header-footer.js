// MENU
const navButton = document.querySelector("#menu");
const navMenu = document.querySelector(".menu-links");

navButton.addEventListener("click", () => {
    navMenu.classList.toggle("show");
    navButton.classList.toggle("show");
})

window.addEventListener("resize", function () {
    if (this.window.innerWidth >= 768) {
        navMenu.classList.remove("show");
        navButton.classList.remove("show");
    }
})


// FOOTER 
const today = new Date();
const year = document.querySelector("#currentYear");
year.innerHTML = today.getFullYear();

let lastModif = new Date(document.lastModified).toLocaleString('en-us');
const lastModified = document.querySelector("#lastModified");

lastModified.innerHTML = `Last Modified: <span>${lastModif}</span>`;