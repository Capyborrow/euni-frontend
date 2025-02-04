import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost", // Ensures it's always localhost
    port: 5174, // Forces Vite to use port 5174
    strictPort: true, // Prevents Vite from switching to another port
  },
});
