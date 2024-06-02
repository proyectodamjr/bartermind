document.addEventListener("DOMContentLoaded", function() {
    const videosBtn = document.getElementById("videos-btn");
    const commentsBtn = document.getElementById("comments-btn");
    const videosContainer = document.querySelector(".videos");
    const commentsContainer = document.querySelector(".comments");
    const comentariosDiv = document.getElementById("comentarios");

    videosBtn.addEventListener("click", function() {
        videosContainer.style.display = "block";
        commentsContainer.style.display = "none";
    });

    commentsBtn.addEventListener("click", function() {
        videosContainer.style.display = "none";
        commentsContainer.style.display = "block";

        // Fetch comments when the "Comentarios" button is clicked
        fetch('/api/comentarios')
            .then(response => response.json())
            .then(data => {
                // Limpiar el contenido actual de comentariosDiv
                comentariosDiv.innerHTML = '';

                // Iterar sobre los comentarios y agregarlos al div de comentarios
                data.forEach(comment => {
                    const commentElement = document.createElement('div');
                    commentElement.className = 'comment d-flex justify-content-between align-items-center mb-3';

                    const textContainer = document.createElement('div');
                    const nameElement = document.createElement('h3');
                    nameElement.textContent = comment.nombre;
                    const textElement = document.createElement('p');
                    textElement.textContent = comment.comentario;
                    
                    textContainer.appendChild(nameElement);
                    textContainer.appendChild(textElement);
                    commentElement.appendChild(textContainer);

                    if (!comment.aceptado) {
                        const acceptButton = document.createElement('button');
                        acceptButton.textContent = 'Aceptar?';
                        acceptButton.className = 'btn btn-outline-success ml-3';
                        acceptButton.addEventListener('click', () => {
                            fetch(`/api/comentarios/aceptar/${comment.id}`, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            })
                            .then(response => response.json())
                            .then(data => {
                                if (data.success) {
                                    swal({
                                        title: "¡Comentario aceptado!",
                                        text: data.message,
                                        icon: "success"
                                    }).then(() => {
                                        acceptButton.remove(); // Eliminar el botón después de aceptar
                                    });
                                }
                            })
                            .catch(error => console.error('Error accepting comment:', error));
                        });
                        commentElement.appendChild(acceptButton);
                    } else {
                        const acceptedElement = document.createElement('p');
                        acceptedElement.textContent = `Aceptado`;
                        commentElement.appendChild(acceptedElement);
                    }

                    comentariosDiv.appendChild(commentElement);
                });
            })
            .catch(error => {
                console.error('Error fetching comments:', error);
            });
    });
});
