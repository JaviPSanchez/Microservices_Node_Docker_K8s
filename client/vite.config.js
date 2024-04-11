import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import macros from "babel-plugin-macros";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), macros()],
  resolve: {
    alias: [
      {
        find: "@styles",
        replacement: "/src/styles",
      },
      {
        find: "@components",
        replacement: "/src/components",
      },
    ],
  },
});
