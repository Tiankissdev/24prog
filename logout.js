document.getElementById('logout-button').addEventListener('click', function() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});
