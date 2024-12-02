// Usuarios y contraseñas válidos (esto debe estar en el servidor en una app real)
const validUsers = {
    admin: "1234",
    user1: "password",
    user2: "abc123"
};

// Manejar el inicio de sesión
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (validUsers[username] && validUsers[username] === password) {
        // Usuario y contraseña correctos
        localStorage.setItem("loggedIn", "true"); // Guardar estado de inicio de sesión
        document.getElementById('login-container').style.display = "none";
        alert("Inicio de sesión exitoso. Bienvenido, " + username + "!");
        // Aquí rediriges al usuario a la página principal
        document.body.style.display = "block"; // Mostrar contenido principal
    } else {
        // Usuario o contraseña incorrectos
        const errorMsg = document.getElementById('login-error');
        errorMsg.style.display = "block";
        errorMsg.textContent = "Usuario o contraseña incorrectos. Intenta nuevamente.";
    }
});

// Validar si el usuario ya inició sesión
window.onload = function () {
    const loggedIn = localStorage.getItem("loggedIn");
    if (loggedIn === "true") {
        document.getElementById('login-container').style.display = "none";
        document.body.style.display = "block"; // Mostrar contenido principal
    } else {
        document.body.style.display = "none"; // Ocultar contenido principal
    }
};