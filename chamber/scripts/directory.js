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
        let name = document.createElement("h2");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let email = document.createElement("p");
        let url = document.createElement("a");
        let level = document.createElement("p");
        let memberSince = document.createElement("p");
        let img = document.createElement("img");

        card.classList = "member-card";

        name.textContent = `${member.name}`;
        if (member.box !== "") {
            address.innerHTML = `<span class="card-label">Address:</span>${member.address}, Box ${member.box}`;
        } 
        else {
            address.innerHTML = `<span class="card-label">Address:</span>${member.address}`;
        }
        phone.innerHTML = `<span class="card-label>Phone:</span>${member.phone}`;
        email.innerHTML = `<span class="card-label">Email:</span>${member.email}`;
        
        url.textContent = `${member.url}`;
        url.href = member.url;
        url.target = "_blank";

        if (member.memberLevel === 1) {
            level.textContent = "Chamber Member";
        }
        else if (member.memberLevel === 2) {
            level.textContent = "Silver Member";
        } 
        else if (member.memberLevel === 3) {
            level.textContent = "Gold Member";
        }
        memberSince.innerHTML = `<span class="card-label">Member Since:</span>${member.memberSince}`;

        img.src = member.image;
        img.alt = `Image or logo for ${member.name}`;
        img.loading = "lazy";
        img.width = "100";
        img.height = "100";

        name.classList = "name";
        address.classList = "address";
        phone.classList = "phone";
        email.classList = "email";
        url.classList = "url";
        level.classList = "level";
        memberSince.classList = "member-since";
        
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(email);
        card.appendChild(url);
        card.appendChild(level);
        card.appendChild(memberSince);
        card.appendChild(img);
        
        cards.appendChild(card);
    })
}

document.addEventListener("DOMContentLoaded", function() {
    const gridView = document.getElementById('grid-view');
    const listView = document.getElementById('list-view');
    const directoryCards = document.querySelector("#directory-cards");

    document.querySelector('.dir-layout').addEventListener('click', function() {
        if (gridView.checked) {
            directoryCards.classList = "grid";
        }
        if (listView.checked) {
            directoryCards.classList = "list";
        }
    });
});
