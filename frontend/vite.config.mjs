import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // allows access via LAN/IP during local dev
    port: 5173, // dev server port
  },
  build: {
    outDir: "dist", // make sure build output is served correctly on Vercel
    emptyOutDir: true, // clean before building
  },
});
