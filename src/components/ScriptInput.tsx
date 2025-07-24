import React from 'react';

interface ScriptInputProps {
  script: string;
  onScriptChange: (script: string) => void;
}

const ScriptInput: React.FC<ScriptInputProps> = ({ script, onScriptChange }) => {
  return (
    <div className="script-input">
      <div className="script-header">
        <h2>Script Editor</h2>
      </div>
      <div className="script-editor">
        <textarea
          value={script}
          onChange={(e) => onScriptChange(e.target.value)}
          placeholder="Enter detailed script for this scene..."
        />
      </div>
    </div>
  );
};

export default ScriptInput;
