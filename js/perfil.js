document.addEventListener("DOMContentLoaded", function() {
    const videosBtn = document.getElementById("videos-btn");
    const commentsBtn = document.getElementById("comments-btn");
    const videosContainer = document.querySelector(".videos");
    const commentsContainer = document.querySelector(".comments");
    const comentariosDiv = document.getElementById("comentarios");
    const nombreUsuarioDiv = document.getElementById("nombreUsuario");
    const videosSubidosContainer = document.getElementById("videos-subidos-container");

    const mostrarVideos = (videos) => {
        videosSubidosContainer.innerHTML = '';

        let row; 
        videos.forEach((video, index) => {
            const videoContainer = document.createElement('div');
            videoContainer.classList.add('video-container', 'col-lg-4', 'col-md-6', 'col-sm-12');

            const videoElement = document.createElement('video');
            videoElement.setAttribute('controls', '');
            videoElement.style.width = '100%'; 
            const sourceElement = document.createElement('source');
            sourceElement.setAttribute('src', `./uploads/${video.enlace}`);
            sourceElement.setAttribute('type', 'video/mp4');

            const h4Element = document.createElement('h4');
            h4Element.textContent = video.titulo;

            const pElement = document.createElement('p');
            pElement.textContent = `Curso: ${video.nombreCurso}`;

            // Crear botón de eliminar
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Eliminar';
            deleteButton.className = 'btn btn-outline-danger mt-2';
            deleteButton.setAttribute('data-id', video.enlace); // Agregar ID del video al botón

            deleteButton.addEventListener('click', async () => {
                try {
                    const response = await fetch(`/api/eliminarVideo/todos/${video.enlace}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    const data = await response.json();
                    if (data.success) {
                        swal({
                            title: "¡Video eliminado!",
                            text: data.message,
                            icon: "success"
                        }).then(() => {
                            // Remover el video eliminado del DOM
                            videoContainer.remove();
                        });
                    } else {
                        swal("Error", data.message, "error");
                    }
                } catch (error) {
                    swal("Error", "No se pudo eliminar el video.", "error");
                }
            });

            // Agregar elementos al contenedor de videos 
            videoContainer.appendChild(videoElement);
            videoContainer.appendChild(h4Element);
            videoContainer.appendChild(pElement);
            videoContainer.appendChild(deleteButton);
            videoElement.appendChild(sourceElement);

            if (index % 3 === 0) {
                row = document.createElement('div');
                row.classList.add('row');
                videosSubidosContainer.appendChild(row);
            }

            row.appendChild(videoContainer);
        });
    };

    const cargarVideosSubidos = async () => {
        try {
            const response = await fetch('/api/videos/subidos');
            const data = await response.json();
            mostrarVideos(data.videos);
        } catch (error) {
            console.error('Error fetching videos subidos:', error);
        }
    };

    const cargarNombreUsuario = async () => {
        try {
            const response = await fetch('/api/nombreUsuario');
            const data = await response.json();
            const h1Element = document.createElement('h1');
            h1Element.textContent = data.nombreUsuario;
            nombreUsuarioDiv.appendChild(h1Element);
        } catch (error) {
            console.error('Error fetching nombreUsuario:', error);
        }
    };

    videosBtn.addEventListener("click", function() {
        videosContainer.style.display = "block";
        commentsContainer.style.display = "none";
        cargarVideosSubidos();
    });

    commentsBtn.addEventListener("click", function() {
        videosContainer.style.display = "none";
        commentsContainer.style.display = "block";

        fetch('/api/comentarios')
            .then(response => response.json())
            .then(data => {
                comentariosDiv.innerHTML = '';

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
                                        acceptButton.remove(); 
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

    cargarNombreUsuario();
    cargarVideosSubidos();
});
