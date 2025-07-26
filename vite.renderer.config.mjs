import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import commonjs from '@rollup/plugin-commonjs'

// https://vitejs.dev/config
export default defineConfig({
  plugins: [react(), tailwindcss(), commonjs()],
});
