/**
 * Cloudinary helpers.
 *
 * The original site served user photos (mentor portraits, event covers,
 * profile pictures) from the `dcrm3y8x2` Cloudinary cloud. Originals of every
 * photo used on the site at scrape time are archived in
 * `_reference/cloudinary-originals/` with their full public-ID paths.
 */

const CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dcrm3y8x2";

/**
 * Build a Cloudinary delivery URL from a public ID.
 *
 * @param publicId e.g. "abroadmates/mentors/ke9dsdaqonk6zjsxclaa"
 * @param opts.transform optional delivery transformation
 */
export function cloudinaryUrl(
  publicId: string,
  opts?: {
    width?: number;
    height?: number;
    crop?: "fill" | "fit" | "scale" | "thumb";
    quality?: "auto" | number;
    format?: "auto" | "webp" | "jpg" | "png";
  },
): string {
  const { width, height, crop = "fill", quality = "auto", format = "auto" } =
    opts ?? {};

  const transformations = [
    width ? `w_${width}` : null,
    height ? `h_${height}` : null,
    crop ? `c_${crop}` : null,
    quality ? `q_${quality}` : null,
    format ? `f_${format}` : null,
  ]
    .filter(Boolean)
    .join(",");

  const base = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;
  return transformations
    ? `${base}/${transformations}/${publicId}`
    : `${base}/${publicId}`;
}

/** Avatar-sized (96×96, face-focused) delivery — matches original site usage. */
export function cloudinaryAvatar(publicId: string): string {
  return cloudinaryUrl(publicId, {
    width: 96,
    height: 96,
    crop: "fill",
    quality: "auto",
    format: "auto",
  });
}

/** Event-cover-sized (960×497, centered) delivery — matches original usage. */
export function cloudinaryCover(publicId: string): string {
  return cloudinaryUrl(publicId, {
    width: 960,
    height: 497,
    crop: "fit",
    quality: "auto",
    format: "auto",
  });
}
