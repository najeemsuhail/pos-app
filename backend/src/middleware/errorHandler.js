const multer = require('multer');

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Image file is too large. Maximum size is 5MB.' });
    }

    return res.status(400).json({ error: err.message });
  }

  if (err?.message === 'Only image files are allowed') {
    return res.status(400).json({ error: err.message });
  }

  if (Array.isArray(err?.storageErrors) && err.storageErrors.length > 0) {
    return res.status(400).json({ error: err.storageErrors[0].message || 'Image upload failed' });
  }

  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  res.status(500).json({ error: 'Internal server error' });
};

module.exports = errorHandler;
