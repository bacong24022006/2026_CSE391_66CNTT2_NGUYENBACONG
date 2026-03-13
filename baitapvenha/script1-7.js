// ================= EVENTS =================

// 1 CLICK EVENT
document.getElementById("btnClick").addEventListener("click", function () {
  document.getElementById("resultClick").innerText = "Bạn đã click!";
});

// 2 KEYBOARD EVENT
document.getElementById("inputKey").addEventListener("keydown", function (e) {
  document.getElementById("resultKey").innerText = "Phím: " + e.key;
});

// 3 FORM SUBMIT
document.getElementById("formDemo").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("inputForm").value;

  document.getElementById("resultForm").innerText = "Xin chào " + name;
});

// 4 EVENT BUBBLING
function logBubble() {
  let log = document.getElementById("resultBubble");

  log.innerHTML += this.id + " được click<br>";
}

document.getElementById("ong").addEventListener("click", logBubble);
document.getElementById("cha").addEventListener("click", logBubble);
document.getElementById("con").addEventListener("click", logBubble);

// 5 EVENT DELEGATION

let list = document.getElementById("list");

list.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-xoa")) {
    e.target.parentElement.remove();
  }
});

document.getElementById("btnThem").addEventListener("click", function () {
  let li = document.createElement("li");

  li.innerHTML = "Mục mới <button class='btn-xoa'>Xóa</button>";

  list.appendChild(li);
});

// ================= PROMISE =================

// 1 Promise + then + catch
document.getElementById("btnPromise").addEventListener("click", function () {
  new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("Lấy dữ liệu thành công");
    }, 2000);
  })

    .then(function (data) {
      document.getElementById("resultPromise").innerText = data;
    })

    .catch(function (err) {
      document.getElementById("resultPromise").innerText = err;
    });
});

// 3 Chain Promise
document.getElementById("btnChain").addEventListener("click", function () {
  Promise.resolve("Bước 1")

    .then(function (data) {
      return data + " → Bước 2";
    })

    .then(function (data) {
      return data + " → Bước 3";
    })

    .then(function (result) {
      document.getElementById("resultChain").innerText = result;
    });
});

// 4 Promise Error
document.getElementById("btnError").addEventListener("click", function () {
  new Promise(function (resolve, reject) {
    if (Math.random() > 0.5) resolve("Thành công");
    else reject("Có lỗi");
  })

    .then(function (data) {
      document.getElementById("resultError").innerText = data;
    })

    .catch(function (err) {
      document.getElementById("resultError").innerText = err;
    });
});

// 5 Callback → Promise

function oldCallback(cb) {
  setTimeout(function () {
    cb("Dữ liệu callback");
  }, 1000);
}

function newPromise() {
  return new Promise(function (resolve) {
    oldCallback(resolve);
  });
}

document.getElementById("btnCallback").addEventListener("click", function () {
  newPromise().then(function (data) {
    document.getElementById("resultCallback").innerText = data;
  });
});

// ================= ASYNC AWAIT =================

// 1 Async Await
document
  .getElementById("btnAsync")
  .addEventListener("click", async function () {
    let data = await new Promise(function (resolve) {
      setTimeout(function () {
        resolve("Dữ liệu async");
      }, 1000);
    });

    document.getElementById("resultAsync").innerText = data;
  });

// 2 3 4 Fetch API + try catch
document
  .getElementById("btnFetch")
  .addEventListener("click", async function () {
    try {
      let res = await fetch("https://jsonplaceholder.typicode.com/users/1");

      let user = await res.json();

      document.getElementById("resultFetch").innerText = user.name;
    } catch (err) {
      document.getElementById("resultFetch").innerText = "Lỗi";
    }
  });

// 5 Hiển thị lên DOM
document
  .getElementById("btnHienThi")
  .addEventListener("click", async function () {
    let list = document.getElementById("userList");

    list.innerHTML = "Đang tải...";

    let res = await fetch("https://jsonplaceholder.typicode.com/users");

    let users = await res.json();

    list.innerHTML = "";

    users.forEach(function (user) {
      let div = document.createElement("div");

      div.className = "user-card";

      div.innerHTML = user.name + " - " + user.email;

      list.appendChild(div);
    });
  });

document.getElementById("btnXoa").addEventListener("click", function () {
  document.getElementById("userList").innerHTML = "";
});
