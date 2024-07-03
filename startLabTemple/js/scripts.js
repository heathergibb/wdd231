import {temples} from '../data/temples.js';
// console.log(temples);

import {url} from '../data/temples.js';
// console.log(url);

const showHere = document.querySelector("#showHere");
const myDialog = document.querySelector("#mydialog");
const myTitle =  document.querySelector("#mydialog h2");
const myClose =  document.querySelector("#mydialog button");
const myInfo =  document.querySelector("#mydialog p");

myClose.addEventListener("click", () => myDialog.close());

function displayItems(data) {
    console.log(data)   
    data.forEach(x => {
        console.log(x);
        const photo = document.createElement("img");
        photo.src = `${url}${x.path}`;
        photo.alt = x.name;

        photo.addEventListener("click", () => showStuff(x));
        showHere.appendChild(photo);
    });
}

displayItems(temples);

function showStuff(x) {
    myTitle.innerHTML = x.name;
    myInfo.innerHTML = `Dedicated ${x.dedicated} by ${x.person} as temple number ${x.number}`;
    myDialog.showModal();

}