document.addEventListener('DOMContentLoaded', function() {
    const productList = document.getElementById('product-list');
    const crudForm = document.getElementById('crud-form');
    const editForm = document.getElementById('edit-form');
    const editModal = document.getElementById('edit-modal');
    const closeModals = document.querySelectorAll('.close');
    const addUserButton = document.getElementById('add-user-button');
    const addUserModal = document.getElementById('add-user-modal');
    const addUserForm = document.getElementById('add-user-form');
    const deleteUserButton = document.getElementById('delete-user-button');
    const deleteUserModal = document.getElementById('delete-user-modal');
    const userList = document.getElementById('user-list');
    const logoutButton = document.getElementById('logout-button');

    let products = JSON.parse(localStorage.getItem('products')) || [];
    let users = JSON.parse(localStorage.getItem('users')) || [];

    let nextId = products.length ? Math.max(products.map(p => p.id)) + 1 : 1;

    // Verificar rol del usuario
    checkUserRole();

    function checkUserRole() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser || currentUser.role !== 'Admin') {
            alert('No tienes permiso para acceder a esta página');
            window.location.href = 'client.html';
        }
    }

    function renderProducts() {
        productList.innerHTML = '';
        products.forEach(product => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${product.nombre} - ${product.stock} en stock - $${product.precio}
                <button class="edit" data-id="${product.id}">Editar</button>
                <button class="delete" data-id="${product.id}">Eliminar</button>
            `;
            productList.appendChild(li);
        });
    }

    function openEditModal(product) {
        document.getElementById('edit-product-nombre').value = product.nombre;
        document.getElementById('edit-product-stock').value = product.stock;
        document.getElementById('edit-product-precio').value = product.precio;
        document.getElementById('edit-product-id').value = product.id;
        editModal.style.display = 'block';
    }

    crudForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('product-nombre').value;
        const stock = document.getElementById('product-stock').value;
        const precio = document.getElementById('product-precio').value;

        products.push({ id: nextId++, nombre, stock, precio });
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
        crudForm.reset();
    });

    editForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const id = parseInt(document.getElementById('edit-product-id').value);
        const nombre = document.getElementById('edit-product-nombre').value;
        const stock = document.getElementById('edit-product-stock').value;
        const precio = document.getElementById('edit-product-precio').value;

        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex !== -1) {
            products[productIndex] = { id, nombre, stock, precio };
            localStorage.setItem('products', JSON.stringify(products));
            renderProducts();
            editModal.style.display = 'none';
        }
    });

    productList.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            const product = products.find(p => p.id === id);
            if (product) {
                openEditModal(product);
            }
        } else if (event.target.classList.contains('delete')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            products = products.filter(p => p.id !== id);
            localStorage.setItem('products', JSON.stringify(products));
            renderProducts();
        }
    });

    closeModals.forEach(button => {
        button.addEventListener('click', function() {
            editModal.style.display = 'none';
            addUserModal.style.display = 'none';
            deleteUserModal.style.display = 'none';
        });
    });

    window.onclick = function(event) {
        if (event.target === editModal) {
            editModal.style.display = 'none';
        } else if (event.target === addUserModal) {
            addUserModal.style.display = 'none';
        } else if (event.target === deleteUserModal) {
            deleteUserModal.style.display = 'none';
        }
    };

    document.getElementById('view-cliente-page').addEventListener('click', function() {
        window.location.href = 'client.html';
    });

    document.getElementById('view-empleado-page').addEventListener('click', function() {
        window.location.href = 'employee.html';
    });

    addUserButton.addEventListener('click', function() {
        addUserModal.style.display = 'block';
    });

    addUserForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombre = document.getElementById('user-nombre').value;
        const password = document.getElementById('user-password').value;
        const role = document.getElementById('user-role').value;

        const userExists = users.some(user => user.nombre === nombre);
        if (userExists) {
            alert('Usuario ya existente, por favor cambie el nombre.');
            return;
        }
        users.push({ nombre, password, role });
        localStorage.setItem('users', JSON.stringify(users));
        addUserForm.reset();
        addUserModal.style.display = 'none';
    });

    deleteUserButton.addEventListener('click', function() {
        renderUsers();
        deleteUserModal.style.display = 'block';
    });

    function renderUsers() {
        userList.innerHTML = '';
        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `
                <b>Nombre:</b> ${user.nombre} <br> <b>Rol:</b> ${user.role}
                <button class="delete" data-nombre="${user.nombre}">Eliminar</button>
                
            `;
            userList.appendChild(li);
        });
    }

    userList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            const nombre = event.target.getAttribute('data-nombre');
            users = users.filter(user => user.nombre !== nombre);
            localStorage.setItem('users', JSON.stringify(users));
            renderUsers();
        }
    });

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });

    renderProducts();
});
