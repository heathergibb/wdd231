const fullURL = window.location.href;
const everything = fullURL.split("?");
let formData = everything[1].split("&");

const subscriberName = document.querySelector("#new-subscriber");

subscriberName.innerHTML = `${show("first")} ${show("last")}`;

function show(data) {
    let result = "";
    formData.forEach((element) => {
        if (element.startsWith(data)) {
            result = element.split("=")[1].replace("%40","@");
        }
    })
    return result;
}