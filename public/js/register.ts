type INPUT_TYPE = HTMLInputElement | null;
type BUTTON_TYPE = HTMLButtonElement | null;

const regex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+?><:"{}[\]]).+$/;
const emailRegex =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

let error = {} as any;
window.onload = function () {
  const regForm = document.getElementById(
    "register_form"
  ) as HTMLFormElement;
  let username: INPUT_TYPE = document.getElementById(
    "username"
  ) as HTMLInputElement;
  let email: INPUT_TYPE = document.getElementById(
    "email"
  ) as HTMLInputElement;
  let password: INPUT_TYPE = document.getElementById(
    "password"
  ) as HTMLInputElement;
  let password2: INPUT_TYPE = document.getElementById(
    "password2"
  ) as HTMLInputElement;
  let agree: INPUT_TYPE = document.getElementById(
    "agree"
  ) as HTMLInputElement;
  const registerBtn: BUTTON_TYPE = document.getElementById(
    "register"
  ) as HTMLButtonElement;

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

function submitForm(form: HTMLFormElement) {
  let submitSpan = document.getElementById(
    "submit_error"
  ) as HTMLElement;

  if (areAllFieldsInvalid(error)) {
    submitSpan.textContent = "Please Check all fields";
  } else {
    submitSpan.textContent = "";
    form.submit();
  }
}

function validate(
  field: INPUT_TYPE,
  event: KeyboardEvent | MouseEvent
) {
  if (!field) return;
  let type = field.type;
  let value = field.value;
  let name = field.id;
  let messageSpan = document.getElementById(
    name + "_error"
  ) as HTMLElement;

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

function validatePassword(
  value: string,
  span: HTMLElement
) {
  if (value.length === 0) {
    span.textContent = "";
  } else if (!regex.test(value) || value.length <= 7) {
    span.textContent =
      "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, and one special character.";
    error.password = true;
  } else {
    span.textContent = "";
    error.password = false;
  }
}

function validateConfirmPassword(
  value: string,
  span: HTMLElement,
  name: string
) {
  //get main password
  let mainPass: INPUT_TYPE = document.getElementById(
    "password"
  ) as HTMLInputElement;

  if (mainPass?.value !== value) {
    span.textContent = "Passwords do not match";
    error[name] = true;
  } else {
    span.textContent = "";
    error[name] = false;
  }
}

function validateEmail(
  value: string,
  span: HTMLElement,
  name: string
) {
  if (value.length === 0) {
    span.textContent = "";
  } else if (!emailRegex.test(value)) {
    span.textContent = "Enter a valid email address";
    error[name] = true;
  } else {
    span.textContent = "";
    error[name] = false;
  }
}

function validateContent(
  value: string,
  span: HTMLElement,
  name: string
) {
  if (value.length <= 4 && value.length !== 0) {
    span.textContent =
      "Please Enter a Valid " + name + " over 4 characters";
    error[name] = true;
  } else {
    error[name] = false;
    span.textContent = "";
  }
}

function validateCheckbox(
  field: INPUT_TYPE,
  span: HTMLElement,
  name: string
) {
  if (field?.checked) {
    error[name] = true;
    span.textContent = "Please Check this box";
  } else {
    error[name] = false;
    span.textContent = "";
  }
}

function areAllFieldsInvalid(error: object) {
  // If the error object is empty, return false
  if (Object.keys(error).length === 0) {
    return true;
  }
  return Object.values(error).some(
    (value) => value === true
  );
}
