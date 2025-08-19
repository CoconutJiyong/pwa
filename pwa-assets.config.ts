import type { Preset } from '@vite-pwa/assets-generator/config';

export const minimal2023Preset: Preset = {
  transparent: {
    sizes: [64, 192, 512],
    favicons: [[48, 'favicon.ico']]
  },
  maskable: {
    sizes: [512],
    resizeOptions:{background: '#171717',fit:'cover'}
  },
  apple: {
    sizes: [180],resizeOptions:{background: '#171717',fit:'cover'},
  },
}