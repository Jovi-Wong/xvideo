import React from "react";

import electron_logo from "../assets/electron.png";
import reactrouter_logo from "../assets/reactrouter.png";
import vitejs_logo from "../assets/vitejs.png";
import tailwindcss_logo from "../assets/tailwindcss.png";

const AddImage = (img, altName, addPluse) => {
  return (
    <>
      <img src={img} alt={altName} className="w-18 h-18" />
      {addPluse && <h2 className="text-3xl font-extrabold">+</h2>}
    </>
  );
};

export default function Intro() {
  return (
    <>
      <div className="flex flex-col content-center justify-center items-center h-100 gap-10 w-[450px]  bg-amber-50  border-black border-1 rounded-lg select-none">
        <div className="flex flex-row justify-center content-center items-center gap-1 ">
          {AddImage(reactrouter_logo, "react router logo", true)}
          {AddImage(electron_logo, "electron logo", true)}
          {AddImage(vitejs_logo, "vitejs logo", true)}
          {AddImage(tailwindcss_logo, "tailwindcss logo", false)}
        </div>
        <div className="flex flex-col items-center">
          <h1 className="text-3x font-bold">Boilerplate Project</h1>
          <h2 className="text-2x font-ligth">
            React + ElectronJs + ViteJs + Tailwindcss
          </h2>
          <p className="w-[350px] text-center text-xs">
            This is a boilerplate build with Vite, React 19.1, TailwindCSS 4,
            Eslint and Prettier.
          </p>
          <p className="w-[350px] text-center text-xs">&copy; Jadoo - 2024</p>
        </div>
      </div>
    </>
  );
}
