import Main from "./Main.tsx";
import { createRoot } from "react-dom/client";
import "./style.css";

const App = () => {
  return (
    <Main />
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
