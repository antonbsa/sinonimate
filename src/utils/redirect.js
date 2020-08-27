let form = document.getElementById('form');
let campo = document.getElementsByName('q');

form.addEventListener('submit', function(e) {
    e.preventDefault();

    window.location.href += `${campo[0].value}`
});