import React, { useState } from 'react';

const initialScript = `INT. FUTURISTIC APARTMENT - DAY\nA sleek, minimalist living space with floating holographic displays and smart furniture. Large windows reveal a cityscape with flying vehicles.\nALEX (30s, confident) paces while dictating to an AI assistant.\nALEX\nI need to create a presentation that will blow everyone away at the board meeting tomorrow.\nThe AI assistant responds with a holographic display showing various design templates and options.\nAI VOICE\nBased on your previous presentations and current trends, I've prepared several options for you to review.\nAlex smiles, impressed by the AI's suggestions.`;

export default function ScriptInputBox({ sceneId, text, onSave }) {
  const [script, setScript] = useState(initialScript);
  const [history, setHistory] = useState([initialScript]);
  const [historyIdx, setHistoryIdx] = useState(0);

  const handleChange = (e) => {
    setScript(e.target.value);
    const newHistory = history.slice(0, historyIdx + 1).concat(e.target.value);
    setHistory(newHistory);
    setHistoryIdx(newHistory.length - 1);
  };
  const handleUndo = () => {
    if (historyIdx > 0) {
      setHistoryIdx(historyIdx - 1);
      setScript(history[historyIdx - 1]);
    }
  };
  const handleRedo = () => {
    if (historyIdx < history.length - 1) {
      setHistoryIdx(historyIdx + 1);
      setScript(history[historyIdx + 1]);
    }
  };
  const handleSave = () => onSave && onSave(script);

  return (
    <aside className="w-full flex flex-col gap-y-3 px-2 bg-[#f4f6f8]">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium text-[#070b11]">Script</h3>
        <div className="flex gap-x-1.5">
          <button className="flex justify-center items-center w-[30px] h-[30px] rounded bg-[#f4f6f8]" onClick={handleUndo}><i className="fas fa-undo text-[#888a8b]" /></button>
          <button className="flex justify-center items-center w-[30px] h-[30px] rounded bg-[#f4f6f8]" onClick={handleRedo}><i className="fas fa-redo text-[#888a8b]" /></button>
        </div>
      </div>
      <div className="flex flex-col grow gap-y-4 bg-white p-4 rounded-lg">
        <div className="flex items-center gap-x-1.5 mb-2">
          <div className="flex justify-center items-center w-6 h-6 rounded bg-[#212528] text-white text-xs font-medium">{sceneId}</div>
          <span className="text-base font-medium text-[#070b11]">Scene {sceneId}</span>
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
          <button className="flex items-center gap-x-1.5 px-4 py-3 rounded bg-[#212528] text-xs text-white" onClick={handleSave}>
            <i className="fas fa-save" /> Save
          </button>
        </div>
      </div>
    </aside>
  );
} 
