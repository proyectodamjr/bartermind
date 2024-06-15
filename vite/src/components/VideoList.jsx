import React, { useEffect, useState } from 'react';
import Video from './Video.jsx';
import swal from 'sweetalert';

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('/api/videos');
                const data = await response.json();
                // Añadir './uploads/' antes de cada enlace de video
                const modifiedVideos = data.videos.map(video => ({
                    ...video,
                    enlace: `./uploads/${video.enlace}`
                }));
                setVideos(modifiedVideos);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        const fetchUser = async () => {
            try {
                const response = await fetch('/api/user'); 
                const userData = await response.json();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchVideos();
        fetchUser();
    }, []);

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
            } else {
                swal("Error", result.message, "error");
            }
        } catch (error) {
            console.error('Error inserting comment:', error);
            swal("Error", "No se pudo eliminar el video.", "error");
        }
    };

    return (
        <div className="container d-flex flex-column">
            {videos.map((video) => (
                <div className="row">
                    <div className="col-12 col-md-8 col-lg-8 ">
                        <div key={video.id} className="video-item w-100 d-flex flex-column justify-content-end mb-4 position-relative">
                            <Video videoUrl={video.enlace} />
                        </div>
                    </div>
                    
                    <div className="col-12 col-md-4 col-lg-4 mb-4">
                        <h5>{video.titulo}</h5>
                        <button className="btn btn-primary" onClick={() => handleTruequeClick(video)}>
                            Trueque
                        </button>
                        <br/>
                        {user.admin === 'S' && (
                            <button className="btn btn-danger mt-1" onClick={() => handleEliminar(video)}>
                                Eliminar
                            </button>
                        )}
                    </div>
                    
                </div>
            ))}
        </div>
    );
};

export default VideoList;
