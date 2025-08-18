import { generateImages } from "pwa-asset-generator";
import path from "path";

const sourceIcon = path.resolve("./public/pwa-assets/splash.png"); // 원본 아이콘
const outputDir = path.resolve("./public/pwa-assets");              // 생성될 파일 위치

(async () => {
  try {
    await generateImages(sourceIcon, outputDir, {
      background: "#171717",  // 스플래시 이미지 배경색
      splashOnly: true,       // 아이콘 + 스플래시 둘 다 생성
      logging: true,
    });
    console.log("PWA assets 생성 완료!");
  } catch (err) {
    console.error("PWA assets 생성 실패:", err);
  }
})();
