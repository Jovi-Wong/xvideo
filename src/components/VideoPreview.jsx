import PropTypes from "prop-types";

VideoPreview.propTypes = {
  onExport: PropTypes.func,
  onShare: PropTypes.func,
  video: PropTypes.string.isRequired,
};

export default function VideoPreview({ onExport, onShare, video }) {
  return (
    <section className="w-full flex flex-col gap-y-4 bg-white p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-medium text-[#070b11]">Video Preview</h2>
        {/* <div className="flex gap-x-3">
          <button onClick={onExport} className="flex items-center gap-x-1.5 px-4 py-3 rounded bg-[#f4f6f8] text-xs text-[#070b11]">
            <i className="fas fa-download" /> Export
          </button>
          <button onClick={onShare} className="flex items-center gap-x-1.5 px-4 py-3 rounded bg-[#212528] text-xs text-white">
            <i className="fas fa-share" /> Share
          </button>
        </div> */}
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
      <aside className="w-full flex flex-col gap-y-3 px-2 bg-[#f4f6f8]">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-[#070b11]">Script</h3>
          <div className="flex gap-x-1.5">
            <button
              className="flex justify-center items-center w-[30px] h-[30px] rounded bg-[#f4f6f8]"
              onClick={handleUndo}
            >
              <i className="fas fa-undo text-[#888a8b]" />
            </button>
            <button
              className="flex justify-center items-center w-[30px] h-[30px] rounded bg-[#f4f6f8]"
              onClick={handleRedo}
            >
              <i className="fas fa-redo text-[#888a8b]" />
            </button>
          </div>
        </div>
        <div className="flex flex-col grow gap-y-4 bg-white p-4 rounded-lg">
          <div className="flex items-center gap-x-1.5 mb-2">
            <div className="flex justify-center items-center w-6 h-6 rounded bg-[#212528] text-white text-xs font-medium">
              {sceneId}
            </div>
            <span className="text-base font-medium text-[#070b11]">
              Scene {sceneId}
            </span>
          </div>
          <textarea
            className="grow shrink w-full text-xs text-[#070b11] bg-transparent"
            rows={12}
            value={text}
            onChange={handleChange}
          />
          <div className="flex justify-between">
            <button className="flex items-center gap-x-1.5 px-4 py-3 rounded bg-[#f4f6f8] text-xs text-[#070b11]">
              <i className="fas fa-microphone" /> Dictate
            </button>
            <button
              className="flex items-center gap-x-1.5 px-4 py-3 rounded bg-[#212528] text-xs text-white"
              onClick={handleSave}
            >
              <i className="fas fa-save" /> Save
            </button>
          </div>
        </div>
      </aside>
    </section>
  );
}
