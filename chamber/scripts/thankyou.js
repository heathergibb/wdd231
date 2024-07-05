const fullURL = window.location.href;

const everything = fullURL.split("?");

let formData = everything[1].split("&");

const level = document.querySelector("#level");
const showInfo = document.querySelector("#results");

level.innerHTML = `for ${show("membership-level")} Membership`;
showInfo.innerHTML = `<p><strong>Submission Details</strong></p>
<p>Name: ${show("first")} ${show("last")}</p>
<p>Email: ${show("email")}</p>
<p>Phone: ${show("phone")}</p>
<p>Organization: ${show("organization-name")}</p>
<p>Submitted: ${show("timestamp")}</p>`

function show(data) {
    let result = "";
    formData.forEach((element) => {
        if (element.startsWith(data)) {
            result = element.split("=")[1].replace("%40","@");
            result = result.replaceAll("+"," ");
            result = result.replace("%28","(");
            result = result.replace("%29",")");
            result = result.replaceAll("%3A",":");
            result = result.replaceAll("%","-")
        }
    })
    return result;
}