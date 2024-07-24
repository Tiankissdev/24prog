document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');

    
    function checkAndAddDefaultUser() {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.length === 0) {
            users.push({
                nombre: 'tiago',
                password: 'tiago',
                role: 'Admin'
            });
            localStorage.setItem('users', JSON.stringify(users));
        }
    }

    
    checkAndAddDefaultUser();

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const user = users.find(user => user.nombre === username && user.password === password);

        if (user) {
            alert('Login exitoso!');
            localStorage.setItem('currentUser', JSON.stringify(user));
            if (user.role === 'Admin') {
                window.location.href = 'admin.html';
            } else if (user.role === 'Empleado') {
                window.location.href = 'employee.html';
            } else if (user.role === 'Cliente') {
                window.location.href = 'client.html';
            }
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });
});
