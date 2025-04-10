// backend/routes/productRoutes.js
import express from 'express';
import products from '../data/product.js'; // or wherever your product data is

const router = express.Router();

router.get('/', (req, res) => {
  res.json(products);
});

export default router;
