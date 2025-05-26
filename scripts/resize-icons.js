import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const sizes = [192, 512];
const inputIcon = join(__dirname, '../public/icons/original-icon.png');
const outputDir = join(__dirname, '../public/icons');

// Créer le dossier icons s'il n'existe pas
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

// Redimensionner pour les icônes normales
sizes.forEach(size => {
  sharp(inputIcon)
    .resize(size, size)
    .toFile(join(outputDir, `icon-${size}x${size}.png`))
    .then(() => console.log(`Icône ${size}x${size} créée`))
    .catch(err => console.error(`Erreur lors de la création de l'icône ${size}x${size}:`, err));
});

// Redimensionner pour les icônes masquables (avec padding)
sizes.forEach(size => {
  const padding = Math.floor(size * 0.1); // 10% de padding
  sharp(inputIcon)
    .resize(size - (padding * 2), size - (padding * 2))
    .extend({
      top: padding,
      bottom: padding,
      left: padding,
      right: padding,
      background: { r: 255, g: 107, b: 107, alpha: 1 } // #ff6b6b
    })
    .toFile(join(outputDir, `maskable-icon-${size}x${size}.png`))
    .then(() => console.log(`Icône masquable ${size}x${size} créée`))
    .catch(err => console.error(`Erreur lors de la création de l'icône masquable ${size}x${size}:`, err));
}); 