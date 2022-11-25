require('dotenv').config(); //secrets file

const cors = require('cors');
const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

//define config
const corsConfig = {
  origin: true,
  credentials: true,
};
app.use(cors(corsConfig)); //then use config
app.options('*', cors(corsConfig));

app.use(express.json());
app.use(cookieParser());

//mongoose & mongoDB connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully 👍');
});

//your custome routes
//can require auth (protect) on specific routes by adding app.use(verifyJWT) specific routes
app.use('/task', require('./routes/taskRoute'));
app.use('/list', require('./routes/listRoute'));
app.use('/auth', require('./routes/authRoute'));
app.use('/', require('./routes/userRoute'));

//server
app.get('/hello', (req, res) => {
  res.send(' 🙈 🙉 🙊');
});

//port to listen on - 3001
app.listen(3001, function () {
  console.log('Express server is running on port 3001 🎉');
});
