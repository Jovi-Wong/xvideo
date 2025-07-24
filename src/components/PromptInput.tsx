import React from 'react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  onSubmit
}) => {
  return (
    <div className="prompt-input">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter video generation prompt..."
        />
        <button type="submit">Generate</button>
      </form>
    </div>
  );
};

export default PromptInput;
