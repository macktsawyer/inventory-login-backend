const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes')
require('dotenv').config();

const PORT = process.env.PORT || '3001';

app.use(express.json());
app.use(cors());
dotenv.config();

const mongooseAPI = process.env.MONGOOSE_API;

mongoose.connect(
    `${mongooseAPI}`
);

app.use('/user', userRoutes)

app.listen(PORT, () => {
    console.log('Running on 3001')
});