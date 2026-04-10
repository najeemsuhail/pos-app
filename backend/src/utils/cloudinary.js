const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { desktopUploadsDir, ensureDir } = require('../db/paths');

const useCloudinary = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

let storage;

if (useCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  storage = new CloudinaryStorage({
    cloudinary,
    params: async () => ({
      folder: process.env.CLOUDINARY_PRODUCT_IMAGE_FOLDER || 'products',
      resource_type: 'image',
      public_id: `menu-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`,
    }),
  });
} else {
  ensureDir(desktopUploadsDir);

  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, desktopUploadsDir);
    },
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname || '').toLowerCase() || '.png';
      cb(null, `menu-${Date.now()}-${Math.random().toString(36).slice(2, 11)}${extension}`);
    },
  });
}

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  },
});

function getUploadedImageUrl(file) {
  if (!file) {
    return null;
  }

  if (useCloudinary) {
    return file.path;
  }

  return `/uploads/${file.filename}`;
}

module.exports = { cloudinary, upload, useCloudinary, getUploadedImageUrl };
