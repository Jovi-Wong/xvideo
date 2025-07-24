import React from 'react';

interface Scene {
  id: string;
  title: string;
  thumbnail: string;
  script: string;
}

interface VideoPreviewProps {
  currentScene: Scene;
  isPlaying: boolean;
  onPlayPause: () => void;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  currentScene,
  isPlaying,
  onPlayPause
}) => {
  return (
    <div className="video-preview">
      <div className="video-container">
        {/* Placeholder for video - in a real app, this would be a video element */}
        <div className="video-placeholder">
          <img 
            src={currentScene.thumbnail} 
            alt={currentScene.title} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div className="scene-title-overlay">{currentScene.title}</div>
        </div>
      </div>
      <div className="video-controls">
        <button className="play-pause-btn" onClick={onPlayPause}>
          {isPlaying ? (
            <i className="fas fa-pause"></i>
          ) : (
            <i className="fas fa-play"></i>
          )}
        </button>
        <div className="timeline">
          <div className="progress-bar">
            <div className="progress" style={{ width: '30%' }}></div>
          </div>
          <div className="time-display">00:15 / 01:30</div>
        </div>
      </div>
    </div>
  );
};

export default VideoPreview;
