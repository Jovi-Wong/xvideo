import { useState, createContext } from 'react'
import PropTypes from 'prop-types'

export const ScriptContext = createContext()

ScriptProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function ScriptProvider({ children }) {
  const [script, setScript] = useState("");
  const [story, setStory] = useState("");

  return (
    <ScriptContext.Provider value={{ script, setScript, story, setStory }}>
      {children}
    </ScriptContext.Provider>
  );
}
