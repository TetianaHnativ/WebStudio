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
const signupForm = document.querySelector(".signup form");

signupForm.addEventListener("submit", e => {
    e.preventDefault(); //prevent form submission
    
    const passwordFields = signupForm.querySelectorAll(".password");
    const password1 = passwordFields[0].value;
    const password2 = passwordFields[1].value;
    
    if(password1 !== password2){
        alert("Паролі не співпадають!");
        return;
    }
    
    //continue with form submission
    signupForm.submit();
})
