require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors());
app.use(express.json());

// mongoose.connect(
//   'mongodb+srv://Ava:PIGGY@cluster0.zxjixwn.mongodb.net/TodoDB?retryWrites=true&w=majority'
// );

const uri = process.env.MONGO_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

app.use('/', require('./routes/taskRoute'));

app.listen(3001, function () {
  console.log('Express server is running on port 3001');
});
