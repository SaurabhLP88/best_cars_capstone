import React from "react";

const VideoBackground = ({ type = "file", src }) => {
  return (
    <div className="video-background">
      
      {/* Local / URL Video */}
      {type === "file" && (
        <video autoPlay loop muted playsInline className="video-bg">
          <source src={src} type="video/mp4" />
        </video>
      )}

      {/* YouTube Embed */}
      {type === "youtube" && (
        <iframe
          className="video-bg"
          src={`https://www.youtube.com/embed/${src}?autoplay=1&mute=1&loop=1&playlist=${src}&controls=0&showinfo=0`}
          frameBorder="0"
          allow="autoplay; fullscreen"
          title="background-video"
        />
      )}
      
    </div>
  );
};

export default VideoBackground;