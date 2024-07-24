document.addEventListener('DOMContentLoaded', function() {
    checkUserRole();
    const productList = document.getElementById('product-list');
    const modal = document.getElementById('edit-modal');
    const modalCloseButton = document.querySelector('#edit-modal .close');
    const modalForm = document.getElementById('edit-form');
    const productInput = document.getElementById('edit-product-id');
    const quantityInput = document.getElementById('edit-quantity');
    const priceInput = document.getElementById('edit-price');
    let currentProductId = null;

    document.getElementById('logout-button').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });

    loadProducts();

    function checkUserRole() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser || currentUser.role !== 'Empleado'&& currentUser.role !== 'Admin') {
            alert('No tienes permiso para acceder a esta página');
            window.location.href = 'client.html';
        }
    }

    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        productList.innerHTML = '';
        products.forEach((product, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${product.nombre} - Stock: ${product.stock} - Precio: $${product.precio}
                <button class="edit" data-id="${index}">Editar</button>
            `;
            productList.appendChild(li);
        });
    }

    productList.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit')) {
            currentProductId = event.target.getAttribute('data-id');
            modal.style.display = 'block';
            const products = JSON.parse(localStorage.getItem('products')) || [];
            const product = products[currentProductId];
            productInput.value = currentProductId;
            quantityInput.value = product.stock;
            priceInput.value = product.precio;
        }
    });

    modalForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const quantity = quantityInput.value;
        const price = priceInput.value;
        const products = JSON.parse(localStorage.getItem('products')) || [];

        if (products[currentProductId]) {
            products[currentProductId].stock = Number(quantity);
            products[currentProductId].precio = Number(price);
            localStorage.setItem('products', JSON.stringify(products));
            loadProducts();
            modal.style.display = 'none';
        }
    });

    modalCloseButton.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
});
