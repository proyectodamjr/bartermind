document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginForm').addEventListener('submit', async (event) => {
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const response = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const result = await response.json();

        if (result.success) {
            swal({
                title: "¡Sesión iniciada!",
                text: result.message,
                icon: "success"
            }).then(() => {
                window.location.href = '/inicio.html'; // Redirige después de mostrar la alerta
            });
        } else {
            swal({
                title: "Error",
                text: result.message,
                icon: "error"
            });
        }
    });
});
