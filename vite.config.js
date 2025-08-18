import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "logo180.png"],
      manifest: {
        short_name: "KK Delivery",
        name: "KOKKOK Delivery",
        start_url: "/",
        display: "standalone",
        theme_color: "#ffffff",
        background_color: "#171717",
        icons: [
          {
            src: "favicon.ico",
            sizes: "256x256 180x180 128x128 64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "logo180.png",
            type: "image/png",
            sizes: "180x180",
          },
        ],
      },
    }),
  ],
});
