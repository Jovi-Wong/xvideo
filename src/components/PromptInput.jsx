import { useState } from 'react';

export default function PromptInput({ onGenerate }) {
  const [prompt, setPrompt] = useState('');
  return (
    <section className="bg-white p-4 rounded-lg mt-4">
      <div className="flex items-center mb-3">
        <h3 className="text-sm font-medium text-[#070b11]">Generate with AI</h3>
      </div>
      <div className="flex gap-x-3">
        <input
          type="text"
          className="grow shrink px-4 py-4 rounded bg-[#f4f6f8] text-xs text-[#070b11]"
          placeholder="Describe what you want to create in this scene..."
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
        />
        <button
          className="flex items-center gap-x-1.5 px-6 py-3 rounded bg-[#212528] text-xs text-white"
          onClick={() => { onGenerate && onGenerate(prompt); }}
        >
          <i className="fas fa-wand-magic" /> Generate
        </button>
      </div>
    </section>
  );
} 
