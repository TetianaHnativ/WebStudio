const MODAL_ACTIVE_CLASS_NAME = 'modal-active';

const formModal = document.querySelector('#form-modal');
const successModal = document.querySelector('#success-modal');
const form = document.querySelector('#form');
const openFormModalBtn = document.querySelector('#open-form-modal');
const sendBtn = document.querySelector('#contact-send-button');
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


const scriptTag = document.createElement('script');
scriptTag.src = 'https://unpkg.com/imask';
scriptTag.addEventListener('load', function() {
    
    const phoneInput = document.getElementById('phone');
    const phoneMask = IMask(phoneInput, {
        mask: '+{38}(000)-000-00-00'
    });

    phoneInput.addEventListener('input', function() {
        const phoneRegex = /^\+38\(\d{3}\)-\d{3}-\d{2}-\d{2}$/;
        const isValid = phoneRegex.test(phoneInput.value);

        phoneInput.setCustomValidity(isValid ? '' : 'Please enter a valid phone number');
    });
});
document.head.appendChild(scriptTag);



form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value;
    const comment = document.querySelector('#comment').value;

    try {
        const response = await fetch('/form-contact', {
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

function clearEmailField() {
    var emailInput = document.getElementById("email-input");
    emailInput.value = ""; // Очищаємо значення поля вводу
}

const logoutButton = document.getElementById('logoutButton');

if(logoutButton) {
    logoutButton.addEventListener('click', async (event) => {
    event.preventDefault();

    try {
        const response = await fetch('/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'same-origin'
        });

        if (response.ok) {
            // Видалення кукі refreshToken
            document.cookie = 'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            // Виконайте будь-які інші дії, необхідні після виходу з системи
            console.log('Logged out successfully');
            window.location.href = "/";
        } else {
            console.log('Logout failed');
        }
        } catch (error) {
            console.error('Error:', error);
        }
    });
}


function subscribe() {
    const emailInput = document.getElementById('email-input').value;
    const errorMessage = document.getElementById('error-message');
    const successMessage = document.getElementById('success-message');

    // Очищаємо попередні повідомлення про помилку та успіх
    errorMessage.textContent = '';
    successMessage.textContent = '';

    if (emailInput.trim() === '') {
        errorMessage.textContent = '* Введіть електронну пошту.';
    } else if (!isValidEmail1(emailInput)) {
        errorMessage.textContent = '* Введіть правильну електронну пошту.';
    } else {
        fetch('/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: emailInput })
        })
        .then(response => {
            if (response.ok) {
                // Показуємо успішне повідомлення
                successMessage.textContent = 'Підписка успішно оформлена.';

                // Очищаємо поле email
                document.getElementById('email-input').value = '';
            } else {
                // Показуємо повідомлення про помилку
                errorMessage.textContent = '* Сталася помилка.';
            }
        })
        .catch(error => {
            // Показуємо повідомлення про помилку
            errorMessage.textContent = '* Сталася помилка.';
            console.error(error);
        });
    }
}

const isValidEmail1 = (email) => {
    const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};