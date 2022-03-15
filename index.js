const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
require('dotenv').config();

const PORT = process.env.PORT || '3001';

app.use(express.json({ limit: '50mb'}));
app.use(express.urlencoded({ limit: '50mb', extended: true}))
app.use(cors());
dotenv.config();

const mongooseAPI = process.env.MONGOOSE_API;

mongoose.connect(
    `${mongooseAPI}`
);

app.use('/user', userRoutes)
app.use('/inv', inventoryRoutes)

app.listen(PORT, () => {
    console.log('Running on 3001')
});