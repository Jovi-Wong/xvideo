import Index from "./Index.jsx";

import { createRoot } from "react-dom/client";
import "./style.css";

const App = () => {
  return (
    <Index />
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
