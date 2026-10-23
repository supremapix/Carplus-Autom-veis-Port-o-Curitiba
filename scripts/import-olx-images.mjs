import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';

// URLs observed in the original OLX galleries on 2026-10-23.
// Download unchanged originals; do not substitute or visually alter vehicles.
const source = JSON.parse(await readFile(new URL('./olx-2026-10-23.json', import.meta.url), 'utf8'));
const checks = [];
for (const listing of source.listings) {
  const dir = new URL(`../public/images/vehicles/${listing.slug}/`, import.meta.url);
  await mkdir(dir, { recursive: true });
  for (const [i, photo] of listing.photos.entries()) {
    const url = `https://img.olx.com.br/images/${photo}.webp`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${url}: HTTP ${response.status}`);
    const bytes = Buffer.from(await response.arrayBuffer());
    const meta = await sharp(bytes).metadata();
    if (!meta.width || !meta.height || meta.format !== 'webp') throw new Error(`Invalid image: ${url}`);
    const file = `${String(i + 1).padStart(2, '0')}.webp`;
    await writeFile(new URL(file, dir), bytes);
    checks.push({ listingId: listing.id, file: `/images/vehicles/${listing.slug}/${file}`, source: url, width: meta.width, height: meta.height, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
  }
  console.log(`${listing.id}: ${listing.photos.length} original photos saved`);
}
await writeFile(new URL('./olx-image-checks.json', import.meta.url), JSON.stringify(checks, null, 2) + '\n');
