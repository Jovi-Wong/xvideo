import React, { useState } from 'react';

const mockVideo = {
  src: 'https://static.paraflowcontent.com/public/resource/image/067bd0aa-d95b-42f8-838a-c76b7f3c28fa.jpeg',
  duration: 105,
  current: 32,
};

export default function VideoPreview({ onExport, onShare, video }) {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(mockVideo.current);

  const handlePlayPause = () => setPlaying(p => !p);
  const handleStep = (step) => setCurrent(c => Math.max(0, Math.min(mockVideo.duration, c + step)));
  const formatTime = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <section className="w-full flex flex-col gap-y-4 bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-[#070b11]">Video Preview</h2>
        <div className="flex gap-x-3">
          <button onClick={onExport} className="flex items-center gap-x-1.5 px-4 py-3 rounded bg-[#f4f6f8] text-xs text-[#070b11]">
            <i className="fas fa-download" /> Export
          </button>
          <button onClick={onShare} className="flex items-center gap-x-1.5 px-4 py-3 rounded bg-[#212528] text-xs text-white">
            <i className="fas fa-share" /> Share
          </button>
        </div>
      </div>
      <div className="relative w-full aspect-video">
        <video 
          src={video} 
          className="w-full h-full object-cover rounded-lg"
          controls
          preload="metadata"
          playsInline
        />
      </div>
    </section>
  );
}
