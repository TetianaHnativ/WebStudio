// Отримуємо необхідні елементи з DOM
const modal = document.getElementById("modal");
const openModalBtn = document.getElementById("open-modal-btn");
const closeModalBtn = document.querySelector(".close");

// Функція для відкриття модального вікна
function openModal() {
  modal.style.display = "block";
}

// Функція для закриття модального вікна
function closeModal() {
  modal.style.display = "none";
}

// Обробник події для відкриття модального вікна при кліку на кнопку
openModalBtn.addEventListener("click", openModal);

// Обробник події для закриття модального вікна при кліку на хрестик
closeModalBtn.addEventListener("click", closeModal);

// Обробник події для закриття модального вікна при кліку поза вікном
window.addEventListener("click", function(event) {
  if (event.target == modal) {
    closeModal();
  }
});