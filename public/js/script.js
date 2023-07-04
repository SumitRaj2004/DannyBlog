const createdAt = document.querySelectorAll(".createdAt");
createdAt.forEach((el) => {
    el.textContent = `${new Date(el.textContent).getDate()}.${new Date(el.textContent).getMonth() + 1}.${new Date(el.textContent).getFullYear()}`
})

const adminLoginForm = document.querySelector(".adminLogin-form");
adminLoginForm.addEventListener("submit", (e) => {
    const emailField = adminLoginForm.childNodes[1];
    const passwordField = adminLoginForm.childNodes[3];
    if (!(emailField.value && passwordField.value)){
        e.preventDefault();
        const errorMessageEl = document.querySelector(".error-message");
        errorMessageEl.textContent = "All fields are required";
    }
})
