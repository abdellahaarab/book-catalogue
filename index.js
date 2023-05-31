const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

const bookRoutes = require('./routes/bookRoutes');
const connectToDatabase = require('./database');

app.use('/books', bookRoutes);

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`);
  console.log(`Server Starting in http://127.0.0.1:${PORT}/books`)
});
