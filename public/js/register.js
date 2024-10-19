const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+?><:"{}[\]]).+$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
let error = {};
window.onload = function () {
    const regForm = document.getElementById("register_form");
    let username = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let password2 = document.getElementById("password2");
    let agree = document.getElementById("agree");
    const registerBtn = document.getElementById("register");
    //   Add Listeners
    username?.addEventListener("keyup", (event) => {
        validate(username, event);
    });
    email?.addEventListener("keyup", (event) => {
        validate(email, event);
    });
    password?.addEventListener("keyup", (event) => {
        validate(password, event);
    });
    password2?.addEventListener("keyup", (event) => {
        validate(password2, event);
    });
    agree?.addEventListener("mouseup", (event) => {
        validate(agree, event);
    });
    // Prevent form from submitting when clicking enter if nothing is filled
    regForm?.addEventListener("submit", (event) => {
        event.preventDefault();
    });
    regForm.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            submitForm(regForm);
        }
    });
    registerBtn?.addEventListener("mousedown", (event) => {
        event.preventDefault();
        submitForm(regForm);
    });
    // End of ONLOAD
};
function submitForm(form) {
    let submitSpan = document.getElementById("submit_error");
    if (areAllFieldsInvalid(error)) {
        submitSpan.textContent = "Please Check all fields";
    }
    else {
        submitSpan.textContent = "";
        form.submit();
    }
}
function validate(field, event) {
    if (!field)
        return;
    let type = field.type;
    let value = field.value;
    let name = field.id;
    let messageSpan = document.getElementById(name + "_error");
    switch (type) {
        case "password":
            name !== "password2"
                ? validatePassword(value, messageSpan)
                : validateConfirmPassword(value, messageSpan, name);
            break;
        case "text":
            validateContent(value, messageSpan, name);
            break;
        case "email":
            validateEmail(value, messageSpan, name);
            break;
        // case "checkbox":
        //   validateCheckbox(field, messageSpan, name);
        default:
            break;
    }
}
function validatePassword(value, span) {
    if (value.length === 0) {
        span.textContent = "";
    }
    else if (!regex.test(value) || value.length <= 7) {
        span.textContent =
            "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one special character.";
        error.password = true;
    }
    else {
        span.textContent = "";
        error.password = false;
    }
}
function validateConfirmPassword(value, span, name) {
    //get main password
    let mainPass = document.getElementById("password");
    if (mainPass?.value !== value) {
        span.textContent = "Passwords do not match";
        error[name] = true;
    }
    else {
        span.textContent = "";
        error[name] = false;
    }
}
function validateEmail(value, span, name) {
    if (value.length === 0) {
        span.textContent = "";
    }
    else if (!emailRegex.test(value)) {
        span.textContent = "Enter a valid email address";
        error[name] = true;
    }
    else {
        span.textContent = "";
        error[name] = false;
    }
}
function validateContent(value, span, name) {
    if (value.length <= 4 && value.length !== 0) {
        span.textContent =
            "Please Enter a Valid " + name + " over 4 characters";
        error[name] = true;
    }
    else {
        error[name] = false;
        span.textContent = "";
    }
}
function validateCheckbox(field, span, name) {
    if (field?.checked) {
        error[name] = true;
        span.textContent = "Please Check this box";
    }
    else {
        error[name] = false;
        span.textContent = "";
    }
}
function areAllFieldsInvalid(error) {
    // If the error object is empty, return false
    if (Object.keys(error).length === 0) {
        return true;
    }
    return Object.values(error).some((value) => value === true);
}
