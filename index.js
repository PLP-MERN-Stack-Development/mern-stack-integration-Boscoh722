const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/categories');
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
