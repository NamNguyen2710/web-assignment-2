const usernameinput=document.getElementById("username");
const passwordinput=document.getElementById("password");

usernameinput.addEventListener("change", (e) => {
    const validate=/^[A-Za-z\d]{8,15}$/.test(e.target.value);
    const error=document.getElementById("username-error");

    if (!validate) {
        error.classList.remove("hidden");
    } else {
        error.classList.add("hidden");
    }
});

passwordinput.addEventListener("change",(e) => {
    const validate=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(e.target.value);
    const error=document.getElementById("password-error");

    if (!validate) {
        error.classList.remove("hidden");
    } else {
        error.classList.add("hidden");
    }   
});
    
