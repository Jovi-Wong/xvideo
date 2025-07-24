import React, { useState } from 'react';

const mockVideo = {
  src: 'https://static.paraflowcontent.com/public/resource/image/067bd0aa-d95b-42f8-838a-c76b7f3c28fa.jpeg',
  duration: 105,
  current: 32,
};

export default function VideoPreview({ onExport, onShare }) {
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(mockVideo.current);

  const handlePlayPause = () => setPlaying(p => !p);
  const handleStep = (step) => setCurrent(c => Math.max(0, Math.min(mockVideo.duration, c + step)));
  const formatTime = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  return (
    <section className="flex flex-col gap-y-4 bg-white p-4 rounded-lg">
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
        <img src={mockVideo.src} alt="Video preview" className="w-full h-full object-cover rounded-lg" />
        <div className="video-controls flex flex-col gap-y-3 p-4 absolute bottom-0 left-0 right-0 rounded-b-lg" style={{backgroundImage:'linear-gradient(to top,rgba(0,0,0,0.7) 0%,transparent 100%)'}}>
          <div className="relative w-full h-1 bg-white/30 rounded-full">
            <div className="absolute h-full bg-white rounded-full" style={{width:`${(current/mockVideo.duration)*100}%`}} />
            {[0.25,0.5,0.75].map((p,i) => (
              <div key={i} className="timeline-dot absolute top-[-4px] w-3 h-3 bg-white rounded-full" style={{left:`${p*100}%`}} />
            ))}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-x-4 text-white">
              <button onClick={()=>handleStep(-10)} className="flex justify-center items-center w-9 h-9"><i className="fas fa-step-backward text-base" /></button>
              <button onClick={handlePlayPause} className="flex justify-center items-center w-9 h-9 rounded-full bg-white"><i className={`fas ${playing ? 'fa-pause' : 'fa-play'} text-sm`} style={{color:'#212528'}} /></button>
              <button onClick={()=>handleStep(10)} className="flex justify-center items-center w-9 h-9"><i className="fas fa-step-forward text-base" /></button>
            </div>
            <div className="text-xs text-white">{formatTime(current)} / {formatTime(mockVideo.duration)}</div>
            <div className="flex gap-x-4 text-white">
              <button className="flex justify-center items-center w-9 h-9"><i className="fas fa-volume-up text-base" /></button>
              <button className="flex justify-center items-center w-9 h-9"><i className="fas fa-expand text-base" /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 
