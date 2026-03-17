// ===== Regex =====
const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^0[0-9]{9}$/;

// ===== Đếm ký tự họ tên =====
fullname.addEventListener("input", function () {
  let len = fullname.value.length;
  nameCount.innerText = len + "/50";
});

// ===== Toggle password =====
togglePass.addEventListener("click", function () {
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
});

// ===== Độ mạnh mật khẩu =====
password.addEventListener("input", function () {
  let val = password.value;
  let strength = 0;

  if (val.length >= 6) strength++;
  if (/[A-Z]/.test(val)) strength++;
  if (/[0-9]/.test(val)) strength++;
  if (/[^A-Za-z0-9]/.test(val)) strength++;

  if (strength <= 1) {
    strengthBar.style.width = "33%";
    strengthBar.style.background = "red";
    strengthText.innerText = "Yếu";
  } else if (strength <= 3) {
    strengthBar.style.width = "66%";
    strengthBar.style.background = "orange";
    strengthText.innerText = "Trung bình";
  } else {
    strengthBar.style.width = "100%";
    strengthBar.style.background = "green";
    strengthText.innerText = "Mạnh";
  }
});

// ===== Validate =====
function validateFullname() {
  let value = fullname.value.trim();

  if (value.length < 3 || value.length > 50) {
    fullnameError.innerText = "3-50 ký tự";
    return false;
  }
  if (!nameRegex.test(value)) {
    fullnameError.innerText = "Chỉ chữ";
    return false;
  }

  fullnameError.innerText = "";
  return true;
}

function validateEmail() {
  if (!emailRegex.test(email.value)) {
    emailError.innerText = "Email sai";
    return false;
  }
  emailError.innerText = "";
  return true;
}

function validatePhone() {
  if (!phoneRegex.test(phone.value)) {
    phoneError.innerText = "SĐT sai";
    return false;
  }
  phoneError.innerText = "";
  return true;
}

function validatePassword() {
  if (password.value.length < 8) {
    passwordError.innerText = "≥ 8 ký tự";
    return false;
  }
  passwordError.innerText = "";
  return true;
}

function validateConfirm() {
  if (confirmPassword.value !== password.value) {
    confirmPasswordError.innerText = "Không khớp";
    return false;
  }
  confirmPasswordError.innerText = "";
  return true;
}

// ===== Submit =====
form.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid =
    validateFullname() &
    validateEmail() &
    validatePhone() &
    validatePassword() &
    validateConfirm();

  if (valid) {
    form.style.display = "none";
    success.innerText = "Đăng ký thành công 🎉 " + fullname.value;
  }
});
