import PropTypes from 'prop-types';

VideoPreview.propTypes = {
  onExport: PropTypes.func.isRequired,
  onShare: PropTypes.func.isRequired,
  video: PropTypes.string.isRequired,
};

export default function VideoPreview({ onExport, onShare, video }) {
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
