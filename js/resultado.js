document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('query');
    const id = urlParams.get('id');
    const category = urlParams.get('category');

    const fetchUser = async () => {
        try {
            const response = await fetch('/api/user');
            const userData = await response.json();
            return userData;
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error; 
        }
    };

    const isAdmin = async () => {
        try {
            const user = await fetchUser();
            return user && user.admin === 'S';
        } catch (error) {
            console.error('Error checking admin status:', error);
            return false;
        }
    };

    const loadData = async (query, id) => {
        try {
            if (query) {
                const response = await fetch(`/resultado?query=${query}&category=${category}`);
                const data = await response.json();
                displayResults(data.videos, data.usuarios);
            } else if (id) {
                const response = await fetch(`/resultado?id=${id}`);
                const data = await response.json();
                displayResults(data.videos, []); 
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const displayResults = (videos, usuarios) => {
        const videosContainer = document.getElementById('videos-container');
        const usuariosContainer = document.getElementById('usuarios-container');

        // Mostrar videos
        videosContainer.innerHTML = '';
        const videosContainerDiv = document.createElement('div');
        videosContainerDiv.className = 'container d-flex flex-column';

        videos.forEach(video => {
            const rowDiv = document.createElement('div');
            rowDiv.className = 'row';

            const videoColDiv = document.createElement('div');
            videoColDiv.className = 'col-12 col-md-8 col-lg-8';

            const videoItemDiv = document.createElement('div');
            videoItemDiv.className = 'video-item w-100 d-flex flex-column justify-content-end mb-4 position-relative';
            videoItemDiv.key = video.id;

            const videoWrapperDiv = document.createElement('div');
            videoWrapperDiv.className = 'video-wrapper';

            const videoElement = document.createElement('video');
            videoElement.className = 'video-player';
            videoElement.setAttribute('controls', '');
            const sourceElement = document.createElement('source');
            sourceElement.setAttribute('src', `./uploads/${video.enlace}`);
            sourceElement.setAttribute('type', 'video/mp4');
            videoElement.appendChild(sourceElement);

            videoWrapperDiv.appendChild(videoElement);
            videoItemDiv.appendChild(videoWrapperDiv);
            videoColDiv.appendChild(videoItemDiv);

            const infoColDiv = document.createElement('div');
            infoColDiv.className = 'col-12 col-md-4 col-lg-4 mb-4';

            const titleElement = document.createElement('h5');
            titleElement.textContent = video.titulo;

            const truequeButton = document.createElement('button');
            truequeButton.className = 'btn btn-primary';
            truequeButton.textContent = 'Trueque';
            truequeButton.onclick = () => handleTruequeClick(video);

            const breakElement = document.createElement('br');

            infoColDiv.appendChild(titleElement);
            infoColDiv.appendChild(truequeButton);
            infoColDiv.appendChild(breakElement);

            isAdmin().then(isAdmin => {
                if (isAdmin) {
                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'btn btn-danger mt-1';
                    deleteButton.textContent = 'Eliminar';
                    deleteButton.onclick = () => handleEliminar(video);
                    infoColDiv.appendChild(deleteButton);
                }
            });

            rowDiv.appendChild(videoColDiv);
            rowDiv.appendChild(infoColDiv);
            videosContainerDiv.appendChild(rowDiv);
        });

        videosContainer.appendChild(videosContainerDiv);

        // Mostrar usuarios
        usuariosContainer.innerHTML = '';
        usuarios.forEach(usuario => {
            const usuarioRow = document.createElement('div');
            usuarioRow.className = 'row align-items-center mb-4 p-3';

            const userInfoCol = document.createElement('div');
            userInfoCol.className = 'col-10 d-flex align-items-center'; 
            userInfoCol.style.cursor = 'pointer'; 
            userInfoCol.onclick = () => {
                window.location.href = `/perfilUsuario.html?id=${usuario.id}`;
            };

            const userImage = document.createElement('img');
            userImage.src = '../images/perfil.png';
            userImage.alt = 'Usuario';
            userImage.width = 60;
            userImage.height = 60;
            userInfoCol.appendChild(userImage);

            const userName = document.createElement('h4');
            userName.textContent = usuario.nombre;
            userInfoCol.appendChild(userName);

            usuarioRow.appendChild(userInfoCol);

            isAdmin().then(isAdmin => {
                if (isAdmin) {
                    const deleteButtonCol = document.createElement('div');
                    deleteButtonCol.className = 'col-2 text-right';

                    const deleteButton = document.createElement('button');
                    deleteButton.className = 'btn btn-danger m-1';
                    deleteButton.textContent = 'Eliminar';
                    deleteButton.onclick = () => handleEliminarUsuario(usuario.id);
                    deleteButtonCol.appendChild(deleteButton);

                    usuarioRow.appendChild(deleteButtonCol);
                }
            });

            usuariosContainer.appendChild(usuarioRow);
        });
    };

    const handleTruequeClick = async (video) => {
        try {
            const response = await fetch('/api/comentarios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comentario: 'Quiere hacer un Trueque contigo!',
                    idCurso: video.idCurso,
                    usuarios_id: video.usuarios_id,
                    comentarista_id1: 1,
                    video_id: video.id
                }),
            });
            const result = await response.json();
            if (response.ok) {
                swal("¡Trueque enviado!", "El comentario se ha enviado correctamente.", "success");
            } else {
                swal("Error", result.message, "error");
            }
        } catch (error) {
            console.error('Error inserting comment:', error);
            swal("Error", "No se pudo enviar el comentario.", "error");
        }
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
                    usuarios_id: video.usuarios_id,
                    comentarista_id1: 1,
                    video_id: video.id
                }),
            });
            const result = await response.json();
            if (response.ok) {
                swal("¡Video eliminado!", "El video ha sido eliminado correctamente.", "success");
                // Elimina el video del DOM
                loadData(query, id);
            } else {
                swal("Error", result.message, "error");
            }
        } catch (error) {
            console.error('Error inserting comment:', error);
            swal("Error", "No se pudo eliminar el video.", "error");
        }
    };

    const handleEliminarUsuario = async (usuarioId) => {
        try {
            const response = await fetch('/api/eliminarUsuario', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    comentario: 'El usuario ha sido eliminado por un administrador',
                    usuario_id: usuarioId,
                    comentarista_id: 1,
                }),
            });
            const result = await response.json();
            if (response.ok) {
                swal("¡Usuario eliminado!", "El usuario ha sido eliminado correctamente.", "success");
                // Actualizar la lista de usuarios
                loadData(query, id);
            } else {
                swal("Error", result.message, "error");
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            swal("Error", "No se pudo eliminar el usuario.", "error");
        }
    };

    // Cargar los datos iniciales
    await loadData(query, id);
});

function menuToggle() {
    const toggleMenu = document.querySelector('.menu');
    toggleMenu.classList.toggle('active');
}
