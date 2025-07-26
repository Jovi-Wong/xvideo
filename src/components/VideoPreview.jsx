import PropTypes from "prop-types";

VideoPreview.propTypes = {
  onExport: PropTypes.func,
  onShare: PropTypes.func,
  video: PropTypes.string.isRequired,
  aside: PropTypes.string,
};

export default function VideoPreview({ onExport, onShare, video, aside }) {
  return (
    <div className="w-full flex bg-white p-4 rounded-lg">
      {/** 视频编辑 **/}
      <div className="grow">
        <h2 className="w-full text-xl font-medium text-[#070b11] pb-4">Video Preview</h2>

        {/** 视频预览 **/}
        <video
          src={video}
          className="w-full h-full object-cover rounded-lg resize-none"
          controls
          preload="metadata"
          playsInline
        />

        {/** 视频重生 **/}
        <section className="w-full bg-white p-4 rounded-lg mt-4">
          <div className="flex items-center mb-3">
            <h3 className="text-sm font-medium text-[#070b11]">
              Tell me what you want to create
            </h3>
          </div>
          <div className="flex gap-x-3">
            <input
              type="text"
              className="grow shrink px-4 py-4 rounded bg-[#f4f6f8] text-xs text-[#070b11] resize-none"
              placeholder="Describe what you want to create in this scene..."
              value={prompt}
              // onChange={e => setPrompt(e.target.value)}
            />
            <button
              className="flex items-center gap-x-1.5 px-6 py-3 rounded bg-[#212528] text-xs text-white"
              // onClick={() => { onGenerate && onGenerate(prompt); }}
            >
              <i className="fas fa-wand-magic" /> Generate
            </button>
          </div>
        </section>
      </div>

      {/* 文本编辑 */}
      <div className="w-64 flex flex-col gap-y-3 px-2 bg-white justify-center items-center">
        <h3 className="text-sm font-medium text-black">Script</h3>
        <textarea
          className="grow shrink w-full text-xs text-black bg-transparent resize-none border-2 border-gray-300 rounded-lg p-2"
          rows={12}
          value={aside}
          // onChange={handleChange}
        />
        <select className="w-full text-xs text-black bg-white border-2 border-gray-300 rounded-lg p-2 mb-2">
          <option value="">选择音色</option>
          <option value="male">男声</option>
          <option value="female">女声</option>
          <option value="child">童声</option>
          <option value="elderly">老年声</option>
          <option value="robot">机器人声</option>
        </select>
        <div className="flex gap-x-1.5">
          <button
            className="w-20 flex justify-center items-center h-[30px] rounded bg-[#f4f6f8]"
          >
            生成音频
          </button>
          <button
            className="w-20 flex justify-center items-center h-[30px] rounded bg-[#f4f6f8]"
            // onClick={handleRedo}
          >
            生成字幕
          </button>
        </div>
      </div>
    </div>
  );
}
