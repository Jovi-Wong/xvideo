import { useState } from 'react';
import PropTypes from 'prop-types';

const initialScript = `INT. FUTURISTIC APARTMENT - DAY\nA sleek, minimalist living space with floating holographic displays and smart furniture. Large windows reveal a cityscape with flying vehicles.\nALEX (30s, confident) paces while dictating to an AI assistant.\nALEX\nI need to create a presentation that will blow everyone away at the board meeting tomorrow.\nThe AI assistant responds with a holographic display showing various design templates and options.\nAI VOICE\nBased on your previous presentations and current trends, I've prepared several options for you to review.\nAlex smiles, impressed by the AI's suggestions.`;

ScriptInputBox.propTypes = {
  sceneId: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
};

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
<></>
  );
} 
