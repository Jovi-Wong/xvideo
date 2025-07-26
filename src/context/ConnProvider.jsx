import { useState, createContext } from 'react'
import PropTypes from 'prop-types'

export const ConnContext = createContext()

ConnProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export function ConnProvider({ children }) {
  const [ws, setWs] = useState(null);

  return (
    <ConnContext.Provider value={{ ws, setWs }}>
      {children}
    </ConnContext.Provider>
  );
}
