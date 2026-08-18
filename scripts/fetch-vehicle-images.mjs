import { mkdir, writeFile, access } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';
import { VEHICLE_IMAGE_SOURCES } from '../src/data/vehicle-image-sources.mjs';

const OUT = join(process.cwd(), 'public', 'images', 'veiculos');
const LOGOS_OUT = join(process.cwd(), 'public', 'images', 'logos');
const SIZES = [400, 800, 1600];
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124';

async function main() {
  console.log('Iniciando download e processamento de imagens de veículos...');
  
  for (const [slug, urls] of Object.entries(VEHICLE_IMAGE_SOURCES)) {
    const dir = join(OUT, slug);
    await mkdir(dir, { recursive: true });
    for (let i = 0; i < urls.length; i++) {
      const n = String(i + 1).padStart(2, '0');
      const target = join(dir, `${n}.jpg`);
      
      try { 
        await access(target); 
        // Verificar se já existe e é válido
        const existingBuf = await import('node:fs').then(fs => fs.promises.readFile(target));
        if (existingBuf[0] === 0xff && existingBuf[1] === 0xd8) {
          console.log('JÁ EXISTE E VÁLIDO', slug, n);
          continue; 
        }
      } catch {}

      try {
        const res = await fetch(urls[i], { headers: { 'User-Agent': UA } });
        if (!res.ok) { 
          console.warn('FALHOU', slug, n, res.status); 
          continue; 
        }
        const buf = Buffer.from(await res.arrayBuffer()); // BINÁRIO — nunca .text()
        if (buf[0] !== 0xff || buf[1] !== 0xd8) { 
          console.warn('NÃO É JPEG', slug, n); 
          continue; 
        }
        await writeFile(target, buf);
        for (const w of SIZES) {
          await sharp(buf)
            .resize({ width: w, withoutEnlargement: true })
            .webp({ quality: 82 })
            .toFile(join(dir, `${n}-${w}.webp`));
        }
        // Gerar versão base webp padrão (800w ou sem redimensionar se menor)
        await sharp(buf)
          .resize({ width: 1200, withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(join(dir, `${n}.webp`));

        console.log('OK', slug, n);
      } catch (err) {
        console.warn('ERRO AO BAIXAR', slug, n, err.message);
      }
    }
  }

  // Garantir logo e OG image válidos
  try {
    await mkdir(LOGOS_OUT, { recursive: true });
    const logoTarget = join(LOGOS_OUT, 'carplus-autos-logo.png');
    const ogTarget = join(process.cwd(), 'public', 'og-image.webp');
    
    // Baixar logo oficial se não existir
    try {
      await access(logoTarget);
    } catch {
      const logoRes = await fetch('https://carplus-pixelperfect.lovable.app/__l5e/assets-v1/a327ddc8-0465-4c4f-87d4-97f5f46faf8e/carplus-autos-logo.png', { headers: { 'User-Agent': UA } });
      if (logoRes.ok) {
        const logoBuf = Buffer.from(await logoRes.arrayBuffer());
        if (logoBuf[0] === 0x89 && logoBuf[1] === 0x50) {
          await writeFile(logoTarget, logoBuf);
          console.log('Logo baixada e validada (PNG).');
        }
      }
    }

    // Gerar OG image
    try {
      await access(ogTarget);
    } catch {
      // Criar um banner simples ou redimensionar a logo para og-image se necessário
      const logoBuf = await import('node:fs').then(fs => fs.promises.readFile(logoTarget).catch(() => null));
      if (logoBuf) {
        await sharp(logoBuf)
          .resize(1200, 630, { fit: 'contain', background: { r: 10, g: 10, b: 10, alpha: 1 } })
          .webp({ quality: 90 })
          .toFile(ogTarget);
        console.log('OG Image gerada com sucesso.');
      }
    }
  } catch (e) {
    console.warn('Erro ao processar logo/OG:', e.message);
  }

  console.log('Processo de imagens concluído com sucesso.');
}

main().catch(console.error);
