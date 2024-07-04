const currentUrl = window.location.href;
console.log(currentUrl);

//Divide the url into two halves

const everything = currentUrl.split('?');
console.log(everything);

// let formData = everything[1];

// //Break the form name value pairs into an array
// formData=formData.split('&');
// console.log(formData);

//Combine them to be more efficient
formData = everything[1].split('&');
console.log(formData);

const showInfo = document.querySelector('#results');
showInfo.innerHTML = `
<p>Appointment for ${show('first')} ${show('last')}</p>
<p>Proxy ${show('ordinance')} on ${show('fecha')} in the ${show('location')} Temple.
`

function show(cup) {
    console.log(cup);
    formData.forEach((element) => {
        if (element.startsWith(cup)) {
            result = element.split('=')[1].replace('%40',"@");
        }
    })
    return (result);
}

