// ----------------------------------------------------------------------
// Helpers shared by the spa2 dashboard "manage" views and the public spa2
// pages for rendering `Spa2AdjustableImage` values (an image URL plus an
// editable focal point + zoom level) as a CSS background.
// ----------------------------------------------------------------------

import type { Spa2AdjustableImage } from 'src/_mock/_spa2';

export function spa2CreateAdjustableImage(url: string): Spa2AdjustableImage {
  return { url, focalX: 50, focalY: 50, zoom: 100 };
}

// Accepts either a plain URL string (legacy fields) or a full
// `Spa2AdjustableImage`, and always returns a normalized object so callers
// never need to branch on the shape.
export function spa2NormalizeAdjustableImage(
  image: Spa2AdjustableImage | string | undefined | null
): Spa2AdjustableImage {
  if (!image) return spa2CreateAdjustableImage('');
  if (typeof image === 'string') return spa2CreateAdjustableImage(image);
  return {
    url: image.url,
    focalX: image.focalX ?? 50,
    focalY: image.focalY ?? 50,
    zoom: image.zoom ?? 100,
  };
}

export function spa2ImageBackgroundStyle(image: Spa2AdjustableImage | string | undefined | null) {
  const normalized = spa2NormalizeAdjustableImage(image);
  if (!normalized.url) return {};
  return {
    backgroundImage: `url(${normalized.url})`,
    backgroundSize: `${Math.max(100, normalized.zoom)}%`,
    backgroundPosition: `${normalized.focalX}% ${normalized.focalY}%`,
    backgroundRepeat: 'no-repeat',
  } as const;
}
