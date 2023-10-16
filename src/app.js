require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/user.router');
const conversionRoutes = require('./routes/conversion.router');

const port = process.env.PORT || 3000;
app.use(cors());
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', authRoutes);
app.use('/api', conversionRoutes);

app.listen(port, () => {
  console.log(`Servidor activo en http://localhost:${port}`);
});