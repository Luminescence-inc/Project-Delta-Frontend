/** @format */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import tailwindcss from "tailwindcss";

// https://vitejs.dev/config/
export default defineConfig({
  // @ts-ignore
  plugins: [react(), svgr(), tsconfigPaths()],
  css: {
    postcss: {
      // @ts-expect-error
      plugins: [tailwindcss()],
    },
  },
});
