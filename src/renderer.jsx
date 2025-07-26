import Index from "./Index.jsx";

import { createRoot } from "react-dom/client";
import { ConnProvider } from "./context/ConnProvider.jsx";
import { ScriptProvider } from "./context/ScriptProvider.jsx";

import "./style.css";

const App = () => {
  return (
    <ConnProvider>
      <ScriptProvider>
        <Index />
      </ScriptProvider>
    </ConnProvider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
