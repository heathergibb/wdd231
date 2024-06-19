const url = "https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json";
const cards = document.querySelector("#cards");

async function getProphetData() {
    const response = await fetch(url);

    console.log(response);
    const data = await response.json();
    
    // console.table(data.prophets);
    displayProphets(data.prophets);
}

getProphetData();

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        let card = document.createElement("section");
        let fullName = document.createElement("h2");
        let portrait = document.createElement("img");

        fullName.textContent = `${prophet.name} ${prophet.lastname}`;

        portrait.src = prophet.imageurl;
        portrait.alt = `Portrait of ${fullName.textContent}`;
        portrait.loading = "lazy";
        portrait.width = "340";
        portrait.height = "440";

        // OR
        // portrait.setAttribute("src",prophet.imageurl); etc.

        card.appendChild(fullName);
        card.appendChild(portrait);
        cards.appendChild(card);
    })
}