document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const purchaseModal = document.getElementById('purchase-modal');
    const purchaseForm = document.getElementById('purchase-form');
    const closeModal = document.querySelector('#purchase-modal .close');

    
    document.getElementById('logout-button').addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });

    loadProducts();

    function loadProducts() {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        productList.innerHTML = '';

        products.forEach((product, index) => {
            const li = document.createElement('li');
            li.textContent = `${product.nombre} - Stock: ${product.stock} - Precio: $${product.precio}`;

            const buyButton = document.createElement('button');
            buyButton.textContent = 'Comprar';
            buyButton.addEventListener('click', function() {
                document.getElementById('purchase-product-id').value = index;
                purchaseModal.style.display = 'block';
            });

            li.appendChild(buyButton);
            productList.appendChild(li);
        });
    }

    purchaseForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const id = document.getElementById('purchase-product-id').value;
        const quantity = Number(document.getElementById('purchase-quantity').value);
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;

        let products = JSON.parse(localStorage.getItem('products')) || [];
        products = products.map((product, index) => {
            if (index === Number(id)) {
                if (product.stock >= quantity) {
                    product.stock -= quantity;
                } else {
                    alert('No hay suficiente stock disponible.');
                    return product;
                }
            }
            return product;
        });
        localStorage.setItem('products', JSON.stringify(products));

        purchaseModal.style.display = 'none';
        loadProducts();
    });

    closeModal.addEventListener('click', function() {
        purchaseModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === purchaseModal) {
            purchaseModal.style.display = 'none';
        }
    });
});
