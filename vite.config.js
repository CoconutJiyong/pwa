import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import {  appleSplashScreenSizes,  minimal2023Preset,} from "@vite-pwa/assets-generator/config";

// 커스텀 애플 스플래시 설정 함수
const devices = ['iPad Air 9.7"', 'iPhone 6'];

function createCustomAppleSplashScreens(
  options = {}
) {
  const { padding, resizeOptions, darkResizeOptions, linkMediaOptions, name } = options;

  return {
    sizes: devices.map((deviceName) => {
      const size = appleSplashScreenSizes[deviceName];
      if (deviceName === "iPhone 6") {
        return {
          size: { ...size, padding: 0.4 },
          darkResizeOptions: { background: "#2f2f2f" },
          name: (landscape, size, dark) =>
            `iphone6-${landscape ? "landscape" : "portrait"}${dark ? "-dark" : ""}.png`,
        };
      }
      return size;
    }),
    padding,
    resizeOptions,
    darkResizeOptions,
    linkMediaOptions,
    name,
  };
}

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "logo180.png", "pwa-assets/splash.png"],
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
      // 🔹 스플래시/아이콘 자동 생성 옵션은 여기!
      pwaAssets: {
        preset: {
          ...minimal2023Preset,
          appleSplashScreens: createCustomAppleSplashScreens({
            padding: 0.5,
            darkResizeOptions: { background: "#1f1f1f" },
          }),
        },
        image: "public/pwa-assets/splash.png", // 원본 스플래시 이미지
        // 타입스크립트에선 에러 날 수 있어서 무시 필요할 수도 있음
        // @ts-ignore
        headLinkOptions: {
          preset: "2023",
        },
      },
    }),
  ],
});
