const express = require('express');
const router = express.Router();
const LicenseService = require('../services/LicenseService');

router.get('/status', (req, res) => {
  const isActivated = LicenseService.checkLicense();
  const machineId = LicenseService.getMachineId();
  res.json({ activated: isActivated, machineId });
});

router.post('/activate', (req, res) => {
  const { productKey } = req.body;
  
  if (!productKey) {
    return res.status(400).json({ success: false, message: 'Product Key is required' });
  }

  const isActivated = LicenseService.activateLicense(productKey);
  
  if (isActivated) {
    res.json({ success: true, message: 'Application activated successfully!' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid product key for this machine.' });
  }
});

module.exports = router;
