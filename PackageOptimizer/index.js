import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import orderRoutes from './routes/orderRoutes.js';
 // Changed to ES module import
 import productRoutes from './routes/productRoutes.js';


 const app = express();

 
 
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api', orderRoutes);

export default app;

