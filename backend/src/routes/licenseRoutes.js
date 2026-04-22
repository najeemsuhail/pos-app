const express = require('express');
const router = express.Router();
const LicenseService = require('../services/LicenseService');
const RemoteLicenseLedgerService = require('../services/RemoteLicenseLedgerService');

router.get('/status', async (req, res, next) => {
  try {
    res.json(await LicenseService.getStatus());
  } catch (error) {
    next(error);
  }
});

router.post('/activate', async (req, res, next) => {
  try {
    const { productKey } = req.body;

    if (!productKey) {
      return res.status(400).json({ success: false, message: 'Product Key is required' });
    }

    const activationResult = await LicenseService.activateLicense(productKey);

    if (activationResult) {
      res.json({ success: true, message: 'Application activated successfully!' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid product key for this machine.' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/ledger/status', async (req, res, next) => {
  try {
    if (!RemoteLicenseLedgerService.isConfigured()) {
      return res.status(503).json({ success: false, message: 'Remote license ledger is not configured.' });
    }

    if (!RemoteLicenseLedgerService.isAuthorized(req)) {
      return res.status(403).json({ success: false, message: 'Unauthorized ledger request.' });
    }

    res.json(await RemoteLicenseLedgerService.resolveStatus(req.body || {}));
  } catch (error) {
    next(error);
  }
});

router.post('/ledger/activate', async (req, res, next) => {
  try {
    if (!RemoteLicenseLedgerService.isConfigured()) {
      return res.status(503).json({ success: false, message: 'Remote license ledger is not configured.' });
    }

    if (!RemoteLicenseLedgerService.isAuthorized(req)) {
      return res.status(403).json({ success: false, message: 'Unauthorized ledger request.' });
    }

    const result = await RemoteLicenseLedgerService.activate(req.body || {});
    if (result.success) {
      return res.json(result);
    }

    return res.status(400).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
