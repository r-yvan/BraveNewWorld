const express = require('express');
const cors = require('cors');
require('dotenv').config();

const tokenRoutes = require('./routes/tokenRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/tokens', tokenRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'EUCL Token API is running' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
