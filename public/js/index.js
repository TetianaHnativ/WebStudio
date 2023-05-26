//asfasfasfasfsafsa
const categorySelect = document.getElementById('category');
const serviceSelect = document.getElementById('service');

categorySelect.addEventListener('change', async () => {
const selectedCategory = categorySelect.value;
const response = await fetch(`/services?category=${selectedCategory}`);
const { services } = await response.json();
serviceSelect.innerHTML = services
    .map((service) => `<option value="${service._id}">${service.name}</option>`)
    .join('');
});


function clearEmailField() {
        var emailInput = document.getElementById("email-input");
        emailInput.value = ""; // Очищаємо значення поля вводу
}