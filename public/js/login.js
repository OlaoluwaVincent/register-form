let error = {};
window.onload = function () {
    let submittable = false;
    const form = document.getElementById("login_form");
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    const loginBtn = document.getElementById("login");
    // Prevent form from submitting when clicking enter if nothing is filled
    form?.addEventListener("submit", (event) => {
        event.preventDefault();
        // console.log(error.username, error.password);
        if (!error.username == undefined ||
            !error.password == undefined) {
            error.username = true;
            error.password = true;
        }
        submitForm(form);
    });
    password?.addEventListener("keyup", (event) => {
        validate(password, event);
    });
    username?.addEventListener("keyup", (event) => {
        validate(username, event);
    });
};
function submitForm(form) {
    let submitSpan = document.getElementById("submit_error");
    if (areAllFieldsInvalid(error)) {
        submitSpan.textContent = "Please fill all fields";
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
            validatePassword(value, messageSpan);
            break;
        case "text":
            validateContent(value, messageSpan, name);
            break;
        default:
            break;
    }
}
function validatePassword(value, span) {
    if (value.length <= 7) {
        span.textContent =
            "Password too short, should be at least 8 character.";
        error.password = true;
    }
    else {
        span.textContent = "";
        error.password = false;
    }
}
function validateContent(value, span, name) {
    if (value.length <= 4) {
        span.textContent =
            "Please Enter a Valid " + name + " over 4 characters";
        error[name] = true;
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
