import Intro from "./components/Intro";
import { createRoot } from "react-dom/client";
import "./style.css";

const fullScreenCenterItems =
  "flex flex-col content-center justify-center items-center w-screen h-screen";

const App = () => {
  return (
    <div className={fullScreenCenterItems + " bg-amber-100 "}>
      <Intro />
    </div>
  );
};
const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
