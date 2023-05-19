const forms = document.querySelector(".forms"),
      pwShowHide = document.querySelectorAll(".eye-icon"),
      links = document.querySelectorAll(".link");

pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
        
        pwFields.forEach(password => {
            if(password.type === "password"){
                password.type = "text";
                eyeIcon.classList.replace("bx-hide", "bx-show");
                return;
            }
            password.type = "password";
            eyeIcon.classList.replace("bx-show", "bx-hide");
        })
        
    })
})      

links.forEach(link => {
    link.addEventListener("click", e => {
       e.preventDefault(); //preventing form submit
       forms.classList.toggle("show-signup");
    })
})
const signupForm = document.querySelector('#signupForm');

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const passwordFields = signupForm.querySelectorAll('.password');
  const password1 = passwordFields[0].value;
  const password2 = passwordFields[1].value;

  if (password1 !== password2) {
    alert('Паролі не співпадають!');
    return;
  }

  const formData = new FormData(signupForm);
  const username = formData.get('email');
  const password = formData.get('password');
  console.log()

  const response2 = await fetch('/auth/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (response2.ok) {
      console.log(data.message);
      window.location.href = "/auth";
  } else {
    const errorData2 = await response2.json();
    const errorMessage2 = errorData2.message;
    // Відобразити повідомлення про помилку
    showErrorRegistration(errorMessage2);
  }
});


const loginForm = document.querySelector(".login form");;

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = loginForm.querySelector('#username').value;
  const password = loginForm.querySelector('#password').value;

  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  });

  
  // Обробити відповідь від сервера
  if (response.ok) {
    window.location.href = "/";
  } else {
    const errorData = await response.json();
    const errorMessage = errorData.message;
    // Відобразити повідомлення про помилку
    showErrorLogin(errorMessage);
  }
});

function showErrorLogin(message) {
  const errorContainer = document.getElementById('error-container');
  errorContainer.innerHTML = `<p class="error-message">${message}</p>`;
}

function showErrorRegistration(message) {
  const errorContainer = document.getElementById('error-container2');
  errorContainer.innerHTML = `<p class="error-message">${message}</p>`;
}