// Отримуємо потрібні елементи з DOM
const modal = document.getElementById("modal");
const successModal1 = document.getElementById("success-modal1");
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.getElementsByClassName("close");
const form1 = document.querySelector('#form1');
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
form1.addEventListener('submit', async (event) => {
  event.preventDefault();

  const data = {
    lastName: document.getElementById('lastName').value,
    firstName: document.getElementById('firstName').value,
    phone: document.getElementById('phone1').value,
    email: document.getElementById('email1').value,
    serviceId: document.getElementById('service').value
  };

  try {
    const response = await fetch('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();
    console.log(responseData);

    document.getElementById('lastName').value = '';
    document.getElementById('firstName').value = '';
    document.getElementById('phone1').value = '';
    document.getElementById('email1').value = '';
    document.getElementById('category').value = '';
    document.getElementById('service').value = '';

    modal.style.display = "none";
    setTimeout(function () {
      successModal1.style.display = "block";
    }, 700);
    setTimeout(function () {
      successModal1.style.display = "none";
    }, 3000);


  } catch (error) {
    console.error(error);
  }
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
