document.addEventListener("DOMContentLoaded", function() {
    const cursosSeguidosContainer = document.getElementById("cursosSeguidos");

    // Función para mostrar los videos agrupados por curso en el contenedor de cursos seguidos
    const mostrarVideos = (videos) => {
        cursosSeguidosContainer.innerHTML = '';

        // Agrupar los videos por curso
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

        // Crear y agregar los elementos de los cursos y sus videos
        Object.values(cursos).forEach(curso => {
            const cursoContainer = document.createElement('div');
            cursoContainer.classList.add('curso-container', 'mb-5');

            // Crear un título para el curso
            const cursoTitle = document.createElement('h2');
            cursoTitle.textContent = curso.nombre;
            cursoContainer.appendChild(cursoTitle);

            // Crear un contenedor para los videos del curso
            const videosRow = document.createElement('div');
            videosRow.classList.add('row');

            // Iterar sobre cada video del curso y agregarlo al contenedor de videos
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
                videosRow.appendChild(videoContainer);
            });

            cursoContainer.appendChild(videosRow);
            cursosSeguidosContainer.appendChild(cursoContainer);
        });
    };

    // Obtener los videos seguidos mediante un fetch
    const cargarVideosSeguidos = () => {
        fetch('/api/cursoVideos/seguidos')
            .then(response => response.json())
            .then(data => {
                mostrarVideos(data.videos);
            })
            .catch(error => {
                console.error('Error fetching videos seguidos:', error);
            });
    };

    cargarVideosSeguidos();
});
