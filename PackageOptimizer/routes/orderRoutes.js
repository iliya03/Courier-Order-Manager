// backend/routes/orderRoutes.js
import { Router } from 'express';
const router = Router();

import { createPackages } from '../controllers/packagingController.js';  // Changed to relative path

// POST /api/place-order
router.post('/place-order', (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    return res.status(400).json({ error: 'Invalid request body: "items" must be an array.' });
  }

  const result = createPackages(items);
  res.json({ packages: result });
});

export default router;
