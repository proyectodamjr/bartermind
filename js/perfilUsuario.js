document.addEventListener("DOMContentLoaded", function() {
    const userProfileContainer = document.getElementById("userProfile");
    const videosContainer = document.getElementById("videos");

    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('id');

    let isAdmin = false;

    if (userId) {
        fetch(`/api/usuarios/${userId}`)
            .then(response => response.json())
            .then(user => {
                const userInfo = document.createElement('h2');
                userInfo.textContent = `${user.nombre}`;
                userProfileContainer.appendChild(userInfo);
            })
            .catch(error => {
                console.error('Error fetching user profile:', error);
            });
    } else {
        userProfileContainer.innerHTML = '<p>ID de usuario no proporcionado.</p>';
    }

    const mostrarVideos = (videos) => {
        videosContainer.innerHTML = '';

        const cursos = {};
        videos.forEach(video => {
            if (!cursos[video.idCurso]) {
                cursos[video.idCurso] = {
                    nombre: video.nombreCurso,
                    videos: []
                };
            }
            cursos[video.idCurso].videos.push(video);
        });

        Object.values(cursos).forEach(curso => {
            const cursoContainer = document.createElement('div');
            cursoContainer.classList.add('curso-container', 'mb-5');

            const cursoTitle = document.createElement('h2');
            cursoTitle.textContent = curso.nombre;
            cursoContainer.appendChild(cursoTitle);

            const videosRow = document.createElement('div');
            videosRow.classList.add('row');

            curso.videos.forEach(video => {
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

                videoElement.appendChild(sourceElement);
                videoContainer.appendChild(videoElement);
                videoContainer.appendChild(h4Element);

                if (isAdmin) {
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Eliminar';
                    deleteButton.classList.add('btn', 'btn-danger', 'mt-1');
                    deleteButton.addEventListener('click', () => handleEliminar(video));
                    videoContainer.appendChild(deleteButton);
                }

                videosRow.appendChild(videoContainer);
            });

            cursoContainer.appendChild(videosRow);
            videosContainer.appendChild(cursoContainer);
        });
    };

    const cargarVideos = () => {
        fetch(`/api/videos/perfilUsuario/${userId}`)
            .then(response => response.json())
            .then(data => {
                mostrarVideos(data.videos);
            })
            .catch(error => {
                console.error('Error fetching videos seguidos:', error);
            });
    };

    const handleEliminar = async (video) => {
        try {
            const response = await fetch('/api/eliminarVideo', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comentario: 'Tu video ha sido eliminado por un administrador',
                    idCurso: video.idCurso,
                    usuarios_id: userId,
                    comentarista_id1: 1,
                    video_id: video.id
                }),
            });
            const result = await response.json();
            if (response.ok) {
                swal({
                    title: "¡Video eliminado!",
                    text: result.message,
                    icon: "success"
                }).then(() => {
                    cargarVideos();
                });
            } else {
                swal("Error", result.message, "error");
            }
        } catch (error) {
            console.error('Error eliminando el video:', error);
            alert("Error al eliminar el video.");
        }
    };

    const verificarAdmin = () => {
        fetch('/api/user')
            .then(response => response.json())
            .then(user => {
                isAdmin = user.admin === 'S';
                cargarVideos();
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    };

    verificarAdmin();
});
