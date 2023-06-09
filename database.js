const mongoose = require('mongoose');
// const secretKey = process.env.MY_SECRET_KEY;
// const dbHost = process.env.DB_HOST;
// const dbPort = process.env.DB_PORT;


const connectToDatabase = () => {
  mongoose.connect('mongodb://127.0.0.1:27017/books_data', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
  });

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Connection error:'));
  db.once('open', () => {
    console.log('Connected to the database');
  });
};

module.exports = connectToDatabase;
