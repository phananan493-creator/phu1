require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 1. Đặt API GET / ở đây
app.get('/', (req, res) => {
  res.status(200).json({
    "message": "Chào mừng bạn đến với Máy chủ RESTful API E-Commerce - LHU TMĐT",
    "version": "1.0.0",
    "status": "ONLINE"
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// 2. Middleware xử lý 404 LUÔN LUÔN NẰM Ở CUỐI CÙNG (trước app.listen)
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Đường dẫn [${req.method}] ${req.originalUrl} không tồn tại!`
  });
});

app.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🚀 Server Tuần 05 đang chạy tại: http://localhost:${PORT}`);
  console.log(`🛒 Test Đặt hàng: POST http://localhost:${PORT}/api/orders`);
  console.log(`📋 Test Danh sách đơn: GET http://localhost:${PORT}/api/orders`);
  console.log('====================================================');
});