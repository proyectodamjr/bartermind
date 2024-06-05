import "../css/VideoStyle.css";
import React from 'react';

const Video = ({ videoUrl }) => {
  return (
    <div className="video-wrapper">
      <video className="video-player" controls>
        <source src={videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};

export default Video;
