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