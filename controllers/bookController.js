const Book = require('../models/book');

module.exports = {
  getAllBooks(req, res) {
    Book.find({})
      .then((books) => {
        res.render('index', { books });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  },

  getBookById(req, res) {
    const id = req.params.id;
    Book.findById(id)
      .then((book) => {
        if (!book) {
          res.status(404).send('Book not found');
        } else {
          res.render('book', { book });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  },

  async showCreateForm(req, res) {
    await res.json(  {"title":"book 1",
    "author":"aarab",
    "description":"desc",
    "publicationDate":"2000-04-04",
    "pageCount":45});
    // await res.render('new');
  },

  createBook(req, res) {
    const { title, author, description, publicationDate, pageCount } = req.body;
    const newBook = new Book({
      title,
      author,
      description,
      publicationDate,
      pageCount,
    });
    newBook.save()
      .then(() => {
        res.redirect('/books');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  },

  showEditForm(req, res) {
    const id = req.params.id;
    Book.findById(id)
      .then((book) => {
        if (!book) {
          res.status(404).send('Book not found');
        } else {
          res.render('edit', { book });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  },

  updateBook(req, res) {
    const id = req.params.id;
    const { title, author, description, publicationDate, pageCount } = req.body;
    Book.findByIdAndUpdate(
      id,
      { title, author, description, publicationDate, pageCount },
    )
      .then((book) => {
        if (!book) {
          res.status(404).send('Book not found');
        } else {
          res.redirect(`/books/${id}`);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  },

  deleteBook(req, res) {
    const id = req.params.id;
    Book.findByIdAndDelete(id)
      .then((book) => {
        if (!book) {
          res.status(404).send('Book not found');
        } else {
          res.redirect('/books');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  },
};
