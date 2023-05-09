const MODAL_ACTIVE_CLASS_NAME = 'modal-active';

const formModal = document.querySelector('#form-modal');
const successModal = document.querySelector('#success-modal');
const form = document.querySelector('#form');

const openFormModalBtn = document.querySelector('#open-form-modal');
const sendBtn = document.querySelector('#send-button');
const closeBtns = document.querySelectorAll('.close-button');

const products = document.querySelectorAll('.products-item');

openFormModalBtn.addEventListener('click', () => {
    formModal.classList.add(MODAL_ACTIVE_CLASS_NAME);
})

const closeFormModal = () => {
    formModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
};

const closeSuccessModal = () => {
    successModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
};

const openSuccessModal = () => {
    successModal.classList.add(MODAL_ACTIVE_CLASS_NAME);
};

closeBtns.forEach(btn => {
    btn.addEventListener('click', e => {
        e.stopPropagation();
        closeFormModal();
        closeSuccessModal();
    })
})


form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => {
        closeFormModal();
        setTimeout(openSuccessModal, 700);
        setTimeout(closeSuccessModal, 3000);
      })
      .catch((error) => console.log('Sending form failed'));
})

const filterProducts = (filter) => {
    products.forEach(product => {
        const description = product.querySelector('.product-description').textContent;
        if (filter !== 'Усі' && description !== filter) {
            product.style.display = 'none';
        } else {
            product.style.display = 'block';
        }
    });
}