import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

import productRouter from './routers/productRouter.js';
import userRouter from './routers/userRouter.js';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js';

import cloudinary from 'cloudinary';
import fileUpload from 'express-fileupload';
import bodyParser from 'body-parser';
import cors from 'cors';
import presRouter from './routers/presRoute.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/medpanda', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,  
  api_key: process.env.CLOUD_API,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use('/api/uploads', uploadRouter);
app.use('/api/prescription', presRouter)
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});


const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname,'frontend/build')))
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'frontend/build/index.html'))
})

// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`);
});
