import sharp from "sharp";
import fs from "fs";
import path from "path";

// 원본 이미지
const sourceImage = path.resolve("public/favicon.svg");

// 출력 폴더
const outputDir = path.resolve("public/pwa-assets");
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// iOS 기기별 스플래시 해상도
const iosDevices = [
  { name: "iPhoneSE", width: 640, height: 1136 },
  { name: "iPhone8Plus", width: 1242, height: 2208 },
  { name: "iPhoneX", width: 1125, height: 2436 },
  { name: "iPhone14Pro", width: 1179, height: 2556 },
  { name: "iPhone14ProMax", width: 1290, height: 2796 },
];

// 안드로이드 아이콘 해상도
const androidIcons = [
  48, 72, 96, 144, 192, 256, 384, 512
];

// 배경색
const backgroundColor = "#171717";

// index.html 경로
const indexPath = path.resolve("index.html");

async function generateAssets() {
  const iosLinks = [];
  const androidIconsManifest = [];

  // iOS 스플래시 생성
  for (const device of iosDevices) {
    const fileName = `splash-${device.width}x${device.height}.png`;
    const outputFile = path.join(outputDir, fileName);

    await sharp(sourceImage)
      .resize(device.width, device.height, { fit: "contain", background: backgroundColor })
      .toFile(outputFile);

    iosLinks.push(
      `<link rel="apple-touch-startup-image" href="/pwa-assets/${fileName}" media="(device-width: ${device.width/3}px) and (device-height: ${device.height/3}px) and (-webkit-device-pixel-ratio: 3)">`
    );
  }

  // Android 아이콘 생성
  for (const size of androidIcons) {
    const fileName = `icon-${size}x${size}.png`;
    const outputFile = path.join(outputDir, fileName);

    await sharp(sourceImage)
      .resize(size, size)
      .toFile(outputFile);

    androidIconsManifest.push({
      src: `/pwa-assets/${fileName}`,
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "any maskable"
    });
  }

  // index.html 업데이트
  let indexHtml = fs.readFileSync(indexPath, "utf-8");
  indexHtml = indexHtml.replace(/<!-- SPLASH START -->[\s\S]*<!-- SPLASH END -->/, "");
  indexHtml = indexHtml.replace(
    "</head>",
    `<!-- SPLASH START -->\n${iosLinks.join("\n")}\n<!-- SPLASH END -->\n</head>`
  );
  fs.writeFileSync(indexPath, indexHtml);

  console.log("✅ iOS splash & Android icons generated!");
  console.log("Android manifest icons:");
  console.log(JSON.stringify(androidIconsManifest, null, 2));
}

generateAssets().catch(console.error);
