import { filterCampgrounds } from "./campgrounds.js";

document.addEventListener("DOMContentLoaded", async function() {
    // load initial campground list
    const initialCampgroundList = await filterCampgrounds("all");
    displayCampgrounds(initialCampgroundList);
    
    const radioButtons = document.querySelectorAll('input[name="search-parks"]');
    
    radioButtons.forEach(button => {
        button.addEventListener('change', async function() {
            if (this.checked) {
                const campgroundList = await filterCampgrounds(this.value);
                displayCampgrounds(campgroundList);
            }
        });
    });
});

function displayCampgrounds(campgrounds) {
    const content = document.querySelector("#content");
    content.innerHTML = "";
    
    let imgCount = 0;
    campgrounds.forEach((campground) => {
        imgCount++;

        let card = document.createElement("section");
        card.classList.add("campground-card");

        let img = document.createElement("img");
        img.setAttribute("src", campground.image);
        img.setAttribute("alt",`${campground.name} campground`);
        //Make the first 2 images eager and have the rest be lazy
        if (imgCount <= 2) {
            img.setAttribute("loading", "eager");
        } else {
            img.setAttribute("loading", "lazy");
        }
        img.classList = "card-img";
        img.setAttribute("width", "640");
        img.setAttribute("height", "480");
        card.appendChild(img);

        let name = document.createElement("h2");
        name.textContent = campground.name;
        card.appendChild(name);

        let desc = document.createElement("p");
        desc.textContent = campground.description;
        card.appendChild(desc);

        let moreInfo = document.createElement("p");
        moreInfo.textContent = "More information...";
        moreInfo.classList.add("modal-link");
        moreInfo.addEventListener("click", () => displayInfo(campground));

        card.appendChild(moreInfo);
        
        content.appendChild(card);

    });

}

function displayInfo(campground) {
    const info = document.querySelector("#info");
    info.innerHTML = "";
    
    let title = document.createElement("h2");
    title.innerHTML = campground.name;
    info.appendChild(title);

    let button = document.createElement("button");
    button.setAttribute("id","closeModal");
    button.textContent = "X";
    info.appendChild(button);

    let servicesHeading = document.createElement("h3");
    servicesHeading.innerHTML = "Services";
    info.appendChild(servicesHeading);

    let list = document.createElement("ul");
    info.appendChild(list);

    campground.services.forEach((service) => {
        let serviceItem = document.createElement("li");
        serviceItem.innerHTML = service;
        serviceItem.classList.add("service-item");
        list.appendChild(serviceItem);
    });

    let feesHeading = document.createElement("h3");
    feesHeading.innerHTML = "Fees";
    info.appendChild(feesHeading);

    let feeList = document.createElement("ul");
    info.appendChild(feeList);

    campground.fees.forEach((feeType) => {
        let feeItem = document.createElement("li");
        feeItem.innerHTML = `${feeType.fee}: ${feeType.type}`;
        feeItem.classList.add("fee-item");
        feeList.appendChild(feeItem);
    });

    const closeModal = document.querySelector("#closeModal");
    closeModal.addEventListener("click", () => info.close());
    info.showModal();    
}