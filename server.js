// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const borrowingRoutes = require('./routes/borrowingRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const reviewController = require('./controllers/reviewController');





const app = express();

// подключаемся к MongoDB
connectDB();

// middleware
app.use(cors());
app.use(express.json());

// тестовый маршрут
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Library backend is running' });
});

// порт из .env или 3000 по умолчанию
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

app.use('/api/books', bookRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/borrowings', borrowingRoutes);
app.use('/api/reviews', reviewRoutes);
app.get('/api/stats/popular-books', reviewController.getPopularBooks);

 