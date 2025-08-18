import {
  defineConfig,
  minimal2023Preset,
} from "@vite-pwa/assets-generator/config";

//NOTE: @vite-pwa/assets-generator 패키지의 타입 정의가 minimal2023Preset 기준으로 splash를 아직 포함하지 않아서 js 파일로 작성
export default defineConfig({
  preset: minimal2023Preset,
  images: ["./public/pwa-assets/favicon.png"], // config 기준 경로
  splash: {
    generate: true,
    backgroundColor: "#171717",
    themeColor: "#ffffff",
    orientation: "portrait",
    padding: 0.1,
  },
});
