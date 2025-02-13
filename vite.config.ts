import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],

  server: {
    proxy: {
      "/api": {
        target: "https://auth-prod.aurumcore.casher.mx/tenant/casher.mx/token",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/api2": {
        target: "https://api-prod.aurumcore.casher.mx:9095",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api2/, ""),
      },
    },
  },
});
