const today = new Date();
const year = document.querySelector("#currentYear");
year.innerHTML = today.getFullYear();

let lastModif = new Date(document.lastModified).toLocaleString('en-us');
const lastModified = document.querySelector("#lastModified");

lastModified.innerHTML = `Last Modified: <span>${lastModif}</span>`;