const express = require('express');
const { upload } = require('../utils/cloudinary');
const MenuItemController = require('../controllers/MenuItemController');
const { authenticate, authorizeFeature } = require('../middleware/auth');

const router = express.Router();

router.get('/', (req, res, next) => MenuItemController.getAll(req, res, next));
router.get('/category/:categoryId', (req, res, next) => MenuItemController.getByCategory(req, res, next));
router.get('/:id', (req, res, next) => MenuItemController.getById(req, res, next));
router.post('/', authenticate, authorizeFeature('menuManagement'), upload.single('image'), (req, res, next) => MenuItemController.create(req, res, next));
router.patch('/:id', authenticate, authorizeFeature('menuManagement'), upload.single('image'), (req, res, next) => MenuItemController.update(req, res, next));
router.post('/:id/image', authenticate, authorizeFeature('menuManagement'), upload.single('image'), (req, res, next) => MenuItemController.uploadImage(req, res, next));
router.patch('/:id/availability', authenticate, authorizeFeature('menuManagement'), (req, res, next) =>
  MenuItemController.toggleAvailability(req, res, next)
);
router.delete('/:id', authenticate, authorizeFeature('menuManagement'), (req, res, next) => MenuItemController.delete(req, res, next));

module.exports = router;
