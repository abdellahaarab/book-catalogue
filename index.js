const express = require('express');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = 3000;
// const secretKey = 'mySuperSecretKey123!@#';
const secretKey = process.env.MY_SECRET_KEY;


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: secretKey,
  resave: false,
  saveUninitialized: false,
}));

const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const connectToDatabase = require('./database');

app.use('/books', bookRoutes);
app.use('/', userRoutes);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
  console.log(`Server Starting in http://127.0.0.1:${PORT}/books`)
});
