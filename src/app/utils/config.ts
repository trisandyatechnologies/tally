export const IMAGE_CDN_ROOT = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/`;
export const siteAddress =
  process.env.NEXT_PUBLIC_SITE_ADDRESS ?? "http://localhost:3000";
export const appLogo = `${siteAddress}/logo.png`;

export const API_ROOT = `${siteAddress}/api/`;