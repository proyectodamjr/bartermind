import React, { useEffect, useState } from 'react';
import Video from './Video.jsx';

const VideoList = () => {
    const [videoUrls, setVideoUrls] = useState([]);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await fetch('/api/videos');
                const data = await response.json();
                // Añadir './uploads/' antes de cada enlace de video
                const modifiedUrls = data.videoUrls.map(url => `./uploads/${url}`);
                setVideoUrls(modifiedUrls);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    return (
        <div className="container d-flex flex-column align-items-center">
            {videoUrls.map((url, index) => (
                <div key={index} className="w-100 d-flex justify-content-center mb-4">
                    <Video videoUrl={url} />
                </div>
            ))}
        </div>
    );
};

export default VideoList;
