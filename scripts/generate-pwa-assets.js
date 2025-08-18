// scripts/generate-ios-splash.js
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// 원본 splash 이미지 경로
const SOURCE_IMAGE = path.resolve('public/pwa-assets/splash.png');

// 생성할 public/apple-splash 폴더
const OUTPUT_DIR = path.resolve('public/pwa-assets');


// iOS 디바이스 해상도 목록 (portrait/landscape)
const DEVICES = [
  // iPhone 7 / 8 / SE(2nd gen)
  { width: 750, height: 1334, ratio: 2, orientation: 'portrait', name: 'iphone7' },
  { width: 1334, height: 750, ratio: 2, orientation: 'landscape', name: 'iphone7' },

  // iPhone 7 Plus / 8 Plus
  { width: 1080, height: 1920, ratio: 3, orientation: 'portrait', name: 'iphone7plus' },
  { width: 1920, height: 1080, ratio: 3, orientation: 'landscape', name: 'iphone7plus' },

  // iPhone X / XS / 11 Pro
  { width: 1125, height: 2436, ratio: 3, orientation: 'portrait', name: 'iphonex' },
  { width: 2436, height: 1125, ratio: 3, orientation: 'landscape', name: 'iphonex' },

  // iPhone XR / 11
  { width: 828, height: 1792, ratio: 2, orientation: 'portrait', name: 'iphonexr' },
  { width: 1792, height: 828, ratio: 2, orientation: 'landscape', name: 'iphonexr' },

  // iPhone XS Max / 11 Pro Max
  { width: 1242, height: 2688, ratio: 3, orientation: 'portrait', name: 'iphonexsmax' },
  { width: 2688, height: 1242, ratio: 3, orientation: 'landscape', name: 'iphonexsmax' },

  // iPhone 12 / 12 Pro / 13 / 13 Pro / 14 / 14 Pro
  { width: 1170, height: 2532, ratio: 3, orientation: 'portrait', name: 'iphone12' },
  { width: 2532, height: 1170, ratio: 3, orientation: 'landscape', name: 'iphone12' },

  // iPhone 12 Mini / 13 Mini / 14 Plus
  { width: 1080, height: 2340, ratio: 3, orientation: 'portrait', name: 'iphone12mini' },
  { width: 2340, height: 1080, ratio: 3, orientation: 'landscape', name: 'iphone12mini' },

  // iPhone 14 Pro
  { width: 1179, height: 2556, ratio: 3, orientation: 'portrait', name: 'iphone14pro' },
  { width: 2556, height: 1179, ratio: 3, orientation: 'landscape', name: 'iphone14pro' },

  // iPhone 14 Pro Max / 15 Pro Max
  { width: 1290, height: 2796, ratio: 3, orientation: 'portrait', name: 'iphone14promax' },
  { width: 2796, height: 1290, ratio: 3, orientation: 'landscape', name: 'iphone14promax' },

  // iPhone 15 / 15 Plus
  { width: 1179, height: 2556, ratio: 3, orientation: 'portrait', name: 'iphone15' },
  { width: 2556, height: 1179, ratio: 3, orientation: 'landscape', name: 'iphone15' },

  // iPhone 15 Pro
  { width: 1179, height: 2556, ratio: 3, orientation: 'portrait', name: 'iphone15pro' },
  { width: 2556, height: 1179, ratio: 3, orientation: 'landscape', name: 'iphone15pro' },
];

// head 안에 넣을 <link> 태그 생성
const links = DEVICES.map(device => {
  const fileName = `${device.name}-${device.orientation}.png`;
  const mediaQuery = `(device-width: ${device.width / device.ratio}px) and (device-height: ${device.height / device.ratio}px) and (-webkit-device-pixel-ratio: ${device.ratio}) and (orientation: ${device.orientation})`;
  return `<link rel="apple-touch-startup-image" href="/pwa-assets/${fileName}" media="${mediaQuery}">`;
}).join('\n');

async function generate() {
  // 출력 폴더 생성
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // 이미지 생성
  for (const device of DEVICES) {
    const fileName = `${device.name}-${device.orientation}.png`;
    const outPath = path.join(OUTPUT_DIR, fileName);

    await sharp(SOURCE_IMAGE)
      .resize(device.width, device.height, { fit: 'cover', position: 'center' })
      .toFile(outPath);
  }

  // index.html 읽기
  const indexPath = path.resolve('index.html');
  let html = fs.readFileSync(indexPath, 'utf-8');

  // head 안에 링크 추가
  html = html.replace(
    /<\/head>/i,
    `${links}\n</head>` // 기존 head 닫기 태그 바로 위에 추가
  );

  fs.writeFileSync(indexPath, html);
  console.log('✅ iOS splash 이미지와 <link> 태그 index.html에 추가 완료!');
}

generate();