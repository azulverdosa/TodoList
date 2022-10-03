require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use('/task', require('./routes/taskRoute'));
app.use('/user', require('./routes/userRoute'));
app.use('/list', require('./routes/listRoute'));

app.listen(3001, function () {
  console.log('Express server is running on port 3001');
});
