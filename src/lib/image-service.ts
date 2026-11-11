import type { ImageTransform, LocalImageService } from 'astro';
import { baseService } from 'astro/assets';
import sharpService from 'astro/assets/services/sharp';
import sharp from 'sharp';

// Astro's sharp service plus a `crop` option: a "x% y% w% h%" box of the source
// that is cut out before resizing, so a cropped thumbnail ships only its own pixels.

export type CropTransform = ImageTransform & { crop?: string };

export function parseCrop(crop: string) {
  const [x, y, w, h] = crop.split(' ').map(value => parseFloat(value) / 100);
  if (![x, y, w, h].every(Number.isFinite) || w <= 0 || h <= 0) {
    throw new Error(`Invalid crop "${crop}"; expected "x% y% w% h%".`);
  }
  return { x, y, w, h };
}

export function cropRegion(crop: string, width: number, height: number) {
  const { x, y, w, h } = parseCrop(crop);
  const left = Math.min(Math.max(Math.round(x * width), 0), width - 1);
  const top = Math.min(Math.max(Math.round(y * height), 0), height - 1);
  return {
    left,
    top,
    width: Math.max(1, Math.min(Math.round(w * width), width - left)),
    height: Math.max(1, Math.min(Math.round(h * height), height - top)),
  };
}

const service: LocalImageService = {
  ...sharpService,
  propertiesToHash: [...(baseService.propertiesToHash ?? []), 'crop'],

  async getURL(options: CropTransform, imageConfig) {
    const url = await sharpService.getURL(options, imageConfig);
    if (!options.crop || !url.includes('?')) return url;
    return `${url}&crop=${encodeURIComponent(options.crop)}`;
  },

  parseURL(url, imageConfig) {
    const transform = sharpService.parseURL(url, imageConfig);
    const crop = url.searchParams.get('crop');
    // The sharp service parses synchronously; a promise is passed through untouched.
    if (!crop || !transform || transform instanceof Promise) return transform;
    return { ...transform, crop };
  },

  async transform(inputBuffer, transform: CropTransform & { src: string }, imageConfig) {
    if (!transform.crop) return sharpService.transform(inputBuffer, transform, imageConfig);

    const { data, info } = await sharp(inputBuffer, { failOnError: false })
      .rotate()
      .toBuffer({ resolveWithObject: true });
    const cropped = await sharp(data)
      .extract(cropRegion(transform.crop, info.width, info.height))
      .png({ compressionLevel: 1 })
      .toBuffer();
    return sharpService.transform(cropped, transform, imageConfig);
  },
};

export default service;
