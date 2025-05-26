import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [192, 512];
const outputDir = join(__dirname, '../public/icons');
const screenshotsDir = join(__dirname, '../public/screenshots');

// Création d'une image de base
const baseIcon = {
  width: 512,
  height: 512,
  channels: 4,
  background: { r: 255, g: 107, b: 107, alpha: 1 }
};

async function generateIcons() {
  // Créer les dossiers s'ils n'existent pas
  await fs.mkdir(outputDir, { recursive: true });
  await fs.mkdir(screenshotsDir, { recursive: true });

  // Créer une image SVG en mémoire
  const svgBuffer = Buffer.from(`
    <svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <rect width="512" height="512" fill="#ff6b6b" rx="128" ry="128"/>
      <text x="256" y="310" fill="white" 
            font-family="Arial Black" font-size="200" 
            text-anchor="middle" dominant-baseline="middle">
        TG
      </text>
    </svg>
  `);

  // Générer les icônes normales
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size, {
        fit: 'contain',
        background: { r: 255, g: 107, b: 107, alpha: 1 }
      })
      .png()
      .toFile(join(outputDir, `icon-${size}x${size}.png`));
    console.log(`Icône ${size}x${size} créée`);
  }

  // Générer les icônes masquables
  for (const size of sizes) {
    const padding = Math.floor(size * 0.1);
    await sharp(svgBuffer)
      .resize(size - (padding * 2), size - (padding * 2), {
        fit: 'contain',
        background: { r: 255, g: 107, b: 107, alpha: 1 }
      })
      .extend({
        top: padding,
        bottom: padding,
        left: padding,
        right: padding,
        background: { r: 255, g: 107, b: 107, alpha: 1 }
      })
      .png()
      .toFile(join(outputDir, `maskable-icon-${size}x${size}.png`));
    console.log(`Icône masquable ${size}x${size} créée`);
  }

  // Créer des captures d'écran
  const screenshots = [
    {
      name: 'desktop.png',
      width: 1920,
      height: 1080,
      background: { r: 44, g: 62, b: 80, alpha: 1 }
    },
    {
      name: 'mobile.png',
      width: 750,
      height: 1334,
      background: { r: 44, g: 62, b: 80, alpha: 1 }
    }
  ];

  for (const screenshot of screenshots) {
    await sharp({
      create: {
        width: screenshot.width,
        height: screenshot.height,
        channels: 4,
        background: screenshot.background
      }
    })
    .png()
    .toFile(join(screenshotsDir, screenshot.name));
    console.log(`Capture d'écran ${screenshot.name} créée (${screenshot.width}x${screenshot.height})`);
  }
}

generateIcons().catch(console.error); 