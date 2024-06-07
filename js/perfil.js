document.addEventListener("DOMContentLoaded", function() {
    const videosBtn = document.getElementById("videos-btn");
    const commentsBtn = document.getElementById("comments-btn");
    const videosContainer = document.querySelector(".videos");
    const commentsContainer = document.querySelector(".comments");
    const comentariosDiv = document.getElementById("comentarios");
    const nombreUsuarioDiv = document.getElementById("nombreUsuario");
    const videosSubidosContainer = document.getElementById("videos-subidos-container");

    // Función para mostrar los videos en el contenedor de videos subidos
    const mostrarVideos = (videos) => {
        videosSubidosContainer.innerHTML = '';

        let row; 
        videos.forEach((video, index) => {
            // Crear un contenedor para el video y su información
            const videoContainer = document.createElement('div');
            videoContainer.classList.add('video-container', 'col-lg-4', 'col-md-6', 'col-sm-12'); // Agregar clases de Bootstrap para el diseño responsivo

            const videoElement = document.createElement('video');
            videoElement.setAttribute('controls', '');
            videoElement.style.width = '100%'; 
            const sourceElement = document.createElement('source');
            // Añadir el prefijo './uploads/' al enlace del video
            sourceElement.setAttribute('src', `./uploads/${video.enlace}`);
            sourceElement.setAttribute('type', 'video/mp4');
            const h4Element = document.createElement('h4');
            h4Element.textContent = video.titulo;
            const pElement = document.createElement('p');
            pElement.textContent = `Curso: ${video.nombreCurso}`;

            // Agregar elementos al contenedor de videos 
            videoContainer.appendChild(videoElement);
            videoContainer.appendChild(h4Element);
            videoContainer.appendChild(pElement);
            videoElement.appendChild(sourceElement);

            // Verificar si es el primer video de una fila nueva
            if (index % 3 === 0) {
                row = document.createElement('div');
                row.classList.add('row');
                videosSubidosContainer.appendChild(row);
            }

            // Agregar el contenedor del video a la fila actual
            row.appendChild(videoContainer);
        });
    };

    // Obtener los videos subidos mediante un fetch
    const cargarVideosSubidos = () => {
        fetch('/api/videos/subidos')
            .then(response => response.json())
            .then(data => {
                mostrarVideos(data.videos);
            })
            .catch(error => {
                console.error('Error fetching videos subidos:', error);
            });
    };

    fetch('/api/nombreUsuario')
        .then(response => response.json())
        .then(data => {
            const h1Element = document.createElement('h1');
            h1Element.textContent = data.nombreUsuario;
            nombreUsuarioDiv.appendChild(h1Element);
        })
        .catch(error => console.error('Error fetching nombreUsuario:', error));

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

    cargarVideosSubidos();
});
