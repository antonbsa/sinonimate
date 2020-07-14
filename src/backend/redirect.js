let form = document.getElementById('form');
let campo = document.getElementsByName('q');

form.addEventListener('submit', function(e) {
    alert(campo[0].value);

    window.location.href = `http://localhost:3000/${campo[0].value}`

    e.preventDefault();
});