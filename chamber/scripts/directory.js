const memberData = "../chamber/data/members.json";
const cards = document.querySelector("#directory-cards");

getMemberData();

async function getMemberData() {
    try {
        const response = await fetch(memberData);
        const data = await response.json();
        console.table(data.members);
        
        displayMemberCards(data.members);
    } catch (error) {
        console.error('Error fetching member data:', error);
    }
}

const displayMemberCards = (members) => {
    members.forEach((member) => {
        let card = document.createElement("section");
        card.classList.add("member-card");

        let name = document.createElement("h2");
        name.textContent = member.name;
        card.appendChild(name);

        let level = document.createElement("p");
        if (member.memberLevel === 1) {
            level.textContent = "Chamber Member";
        } else if (member.memberLevel === 2) {
            level.textContent = "Silver Member";
        } else if (member.memberLevel === 3) {
            level.textContent = "Gold Member";
        }
        level.classList.add("level");
        card.appendChild(level);

        let img = document.createElement("img");
        img.src = member.image;
        img.alt = `Image or logo for ${member.name}`;
        img.loading = "lazy";
        img.width = "100";
        img.height = "100";
        img.classList.add("member-img");
        card.appendChild(img);

        let address = document.createElement("p");
        address.innerHTML = `<span class="card-label">Address:</span> ${member.address}${member.box ? `, Box ${member.box}` : ''}`;
        address.classList.add("info");
        card.appendChild(address);

        let phone = document.createElement("p");
        phone.innerHTML = `<span class="card-label">Phone:</span> ${member.phone}`;
        phone.classList.add("info");
        card.appendChild(phone);

        let email = document.createElement("p");
        email.innerHTML = `<span class="card-label">Email:</span> ${member.email}`;
        email.classList.add("info");
        card.appendChild(email);

        let url = document.createElement("a");
        url.href = member.url;
        url.textContent = `${member.url}`;
        url.classList.add("url");
        url.target = "_blank";
        card.appendChild(url);

        cards.appendChild(card);
    });
};

document.addEventListener("DOMContentLoaded", function() {
    const gridView = document.getElementById('dir-grid-view');
    const listView = document.getElementById('dir-list-view');
    const directoryCards = document.querySelector("#directory-cards");

    document.querySelector('.dir-layout').addEventListener('click', function() {
        if (gridView.checked) {
            directoryCards.classList = "dir-grid";
        }
        if (listView.checked) {
            directoryCards.classList = "dir-list";
        }
    });
});
