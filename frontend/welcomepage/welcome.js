const login = document.getElementById("loginBtn");
const register = document.getElementById("registerBtn");


login.addEventListener('click', function() {
    location.href = "/frontend/loginform/loginform.html";
});
register.addEventListener('click', function() {
    location.href = "/frontend/registrationform/registration.html";
});