const fullURL = window.location.href;
const everything = fullURL.split("?");
let formData = everything[1].split("&");

const subscriberName = document.querySelector("#new-subscriber");
const subscriberEmail = document.querySelector("#email");

subscriberName.innerHTML = `${show("first")} ${show("last")}`;
subscriberEmail.innerHTML = `${show("email")} successfully added.`;


function show(data) {
    let result = "";
    formData.forEach((element) => {
        if (element.startsWith(data)) {
            result = element.split("=")[1].replace("%40","@");
        }
    })
    return result;
}