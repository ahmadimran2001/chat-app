import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,

    //to resolve CORS error
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
});
