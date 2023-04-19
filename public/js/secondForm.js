// Отримуємо потрібні елементи з DOM
const modal = document.getElementById("modal");
const successModal1 = document.getElementById("success-modal1");
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementsByClassName("close");
const form1 = document.getElementById("form1");
const closeSuccessModalBtn = document.getElementById("close-success-modal-btn");

// Додаємо події до кнопок
openModalBtn.onclick = function () {
    modal.style.display = "block";
};

for (let i = 0; i < closeModalBtn.length; i++) {
    closeModalBtn[i].onclick = function () {
        modal.style.display = "none";
        successModal1.style.display = "none";
    };
}

// Додаємо подію до форми
form1.addEventListener("submit", function (event) {
event.preventDefault(); // Зупиняємо стандартну поведінку форми

// Перевіряємо правильність введених даних
const surname = form1.elements.surname.value;
const name = form1.elements.name.value;
const email = form1.elements.email.value;
const phone_number = form1.elements.phone_number.value;

if (!surname || !name || !email || !phone_number) {
    alert("Будь ласка, заповніть всі поля форми.");
    return;
}

// Відправляємо дані форми на сервер за допомогою fetch()
fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(new FormData(form1)).toString(),
})
.then(() => {
        // Якщо відправлення форми успішно, закриваємо модальне вікно та відображаємо модальне вікно успішного відправлення форми
        modal.style.display = "none";
        setTimeout(function () {
            successModal1.style.display = "block";
        }, 700);
        setTimeout(function () {
            successModal1.style.display = "none";
        }, 3000);
    })
    .catch((error) => console.log("Sending form failed"));

    // Очищаємо всі поля форми
    form1.elements.surname.value = "";
    form1.elements.name.value = "";
    form1.elements.email.value = "";
    form1.elements.phone_number.value = "";
});


// Відображаємо модальне вікно успішного відправлення форми з анімацією
successModal1.classList.add("fade-in");

// Затримка перед закриттям модального вікна успішного відправлення форми
setTimeout(function () {
  successModal1.classList.remove("fade-in");
}, 5000);
successModal1.classList.add("fade-in");


if (closeSuccessModalBtn) {
    closeSuccessModalBtn.onclick = function () {
      successModal1.style.display = "none";
    };
}
