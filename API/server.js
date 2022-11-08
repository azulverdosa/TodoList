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

//for express cookie sessions
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { path: '/', httpOnly: true, secure: false, maxAge: 3600000 },
    // httpOnly: true,
    // maxAge: null, //can also be parseInt(process.env.MAX_AGE) - time recorded in miliseconds - 1000ms = 1s, 3600000ms = 1hr
    //can also use 'expire' = res.cookie(name, 'value', {expire: 360000 + Date.now()}) - Expires after 360000 ms from the time it is set.
  })
);
app.use((req, res, next) => {
  console.log('req.session :>> ', req.session);
  next();
});

app.use(cookieParser());

const uri = process.env.MONGO_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

//you custome routes
app.use('/task', require('./routes/taskRoute'));
app.use('/', require('./routes/userRoute'));
app.use('/list', require('./routes/listRoute'));

//server
app.get('/hello', (req, res) => {
  res.send(' 🙈 🙉 🙊');
});

//port to listen on - 3001
app.listen(3001, function () {
  console.log('Express server is running on port 3001 🎉');
});
