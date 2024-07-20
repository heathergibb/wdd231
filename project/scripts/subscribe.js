document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".join-form");

    form.addEventListener("submit", () => {
        if (form.checkValidity()) {
            const firstName = form.querySelector('input[name="first"]').value;
            localStorage.setItem("name", firstName);
        }
    })
})
