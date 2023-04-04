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


form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value;
    const comment = document.querySelector('#comment').value;

    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            name,
            phone,
            email,
            comment
            })
        });

        const data = await response.json();
        console.log(data);
        openSuccessModal();
        closeFormModal();

        document.querySelector('#name').value = '';
        document.querySelector('#phone').value = '';
        document.querySelector('#email').value = '';
        document.querySelector('#comment').value = '';
        } catch (err) {
            console.error(err);
        }
  });

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