// ====== Giá sản phẩm ======
const prices = {
  ao: 150000,
  quan: 200000,
  giay: 300000,
};

// ====== Lấy phần tử ======
const product = document.getElementById("product");
const quantity = document.getElementById("quantity");
const dateInput = document.getElementById("date");
const address = document.getElementById("address");
const note = document.getElementById("note");

const totalEl = document.getElementById("total");
const count = document.getElementById("count");

const confirmBox = document.getElementById("confirmBox");
const summary = document.getElementById("summary");

// ====== Helper ======
function showError(id, msg) {
  document.getElementById(id + "Error").innerText = msg;
}

function clearError(id) {
  document.getElementById(id + "Error").innerText = "";
}

// ====== Validate ======
function validateProduct() {
  if (product.value === "") {
    showError("product", "Chọn sản phẩm");
    return false;
  }
  clearError("product");
  return true;
}

function validateQuantity() {
  let q = Number(quantity.value);

  if (!q || q < 1 || q > 99) {
    showError("quantity", "1 - 99");
    return false;
  }
  clearError("quantity");
  return true;
}

function validateDate() {
  if (!dateInput.value) {
    showError("date", "Chọn ngày");
    return false;
  }

  let selected = new Date(dateInput.value);
  let today = new Date();

  today.setHours(0, 0, 0, 0);

  let max = new Date();
  max.setDate(today.getDate() + 30);

  if (selected < today || selected > max) {
    showError("date", "Trong 0-30 ngày");
    return false;
  }

  clearError("date");
  return true;
}

function validateAddress() {
  if (address.value.trim().length < 10) {
    showError("address", "≥ 10 ký tự");
    return false;
  }
  clearError("address");
  return true;
}

function validateNote() {
  if (note.value.length > 200) {
    showError("note", "Tối đa 200 ký tự");
    return false;
  }
  clearError("note");
  return true;
}

function validatePay() {
  let checked = document.querySelector('input[name="pay"]:checked');

  if (!checked) {
    showError("pay", "Chọn phương thức");
    return false;
  }

  clearError("pay");
  return true;
}

// ====== Tính tiền ======
function updateTotal() {
  let price = prices[product.value] || 0;
  let q = Number(quantity.value) || 0;

  let total = price * q;
  totalEl.innerText = total.toLocaleString("vi-VN");
}

product.addEventListener("change", updateTotal);
quantity.addEventListener("input", updateTotal);

// ====== Đếm ký tự ======
note.addEventListener("input", function () {
  let len = note.value.length;
  count.innerText = len + "/200";

  count.style.color = len > 200 ? "red" : "black";

  clearError("note");
});

// ====== Submit ======
orderForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let valid =
    validateProduct() &
    validateQuantity() &
    validateDate() &
    validateAddress() &
    validateNote() &
    validatePay();

  if (valid) {
    summary.innerText = `Sản phẩm: ${product.options[product.selectedIndex].text}
Số lượng: ${quantity.value}
Tổng tiền: ${totalEl.innerText} VND
Ngày giao: ${dateInput.value}`;

    confirmBox.style.display = "block";
  }
});

// ====== Confirm ======
confirmBtn.addEventListener("click", function () {
  confirmBox.style.display = "none";
  orderForm.style.display = "none";
  success.innerText = "Đặt hàng thành công 🎉";
});

cancelBtn.addEventListener("click", function () {
  confirmBox.style.display = "none";
});
