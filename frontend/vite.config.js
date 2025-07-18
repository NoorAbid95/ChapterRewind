import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite"; // optional

export default defineConfig({
  plugins: [
    svgr({
      svgrOptions: {
        icon: true,
        svgo: true,
      },
    }),
    react(),
    tailwindcss(),
  ],
  test: {
    environment: 'jsdom', 
    globals: true, 
    setupFiles: './src/setupTests.js'
  }
});
