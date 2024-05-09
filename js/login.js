function verificar() {
    const email = document.getElementById('correo').value;
    const contraseña = document.getElementById('contra').value;
    
    alert(email);
    alert(contraseña);
    // Realizar una solicitud HTTP al servidor para autenticar al usuario
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ correo: email, contraseña: contraseña })
    })
    .then(response => {
        if (response.ok) {
            // Redirigir al usuario a la página de vista si la autenticación fue exitosa
            window.location.href = '../vista/index.html';
        } else {
            // Mostrar mensaje de error si la autenticación falló
            console.log("aaab");
            alert('Correo o contraseña incorrectos');
        }
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
        alert('Error de conexión');
    });
}
