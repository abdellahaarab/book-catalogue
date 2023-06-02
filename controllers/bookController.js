const Book = require('../models/book');
const multer = require('multer');



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});


const upload = multer({ storage : storage }) ;


module.exports = {
  getAllBooks(req, res) {
    const user = req.user;
    Book.find({})
      .then((books) => {
        res.render('index',{ books });
      })
      .catch((err) => {
        res.render('error',{ 'message':'Internal Server Error' });
        // console.error(err);
        // res.status(500).send('Internal Server Error');
    });
  },

  getBookById(req, res) {
    const user = req.user;
    const id = req.params.id;
    Book.findById(id)
      .then((book) => {
        if (!book) {
          res.render('error',{ 'message':'Book not found' });
        } else {
          res.render('book', { book });
        }
      })
      .catch((err) => {
        res.render('error',{ 'message':'Internal Server Error' });
      });
  },

  show_CreateForm(req, res) {
      res.render('new');
  },

  createBook(req, res) {
    upload.single('file')(req, res, function (err) {
      if (err) {
        return res.render('error', { message: 'File Upload Error' });
      }

      // upload.single('image')(req, res, function (image_err) {
      //   if (image_err) {
      //     return res.render('error', { message: 'Image Upload Error' });
      //   }
      // });

      const { title, author, description, image, publicationDate, pageCount } = req.body;
      const newBook = new Book({
        title,
        author,
        description,
        // image : req.image.path,
        image,
        publicationDate,
        pageCount,
        file: req.file.path 
      });
  
      newBook.save()
        .then(() => {
          res.redirect('/books');
        })
        .catch((err) => {
          res.render('error', { message: 'Internal Server Error' });
        });
    });
  },
  

  showEditForm(req, res) {
    const id = req.params.id;
    Book.findById(id)
      .then((book) => {
        if (!book) {
          res.render('error',{ 'message':'Book not found' });
        } else {
          res.render('edit', { book });
        }
      })
      .catch((err) => {
        res.render('error',{ 'message':'Internal Server Error' });
      });
  },

  updateBook(req, res) {
    const id = req.params.id;
    const { title, author, description, publicationDate, pageCount } = req.body;
    Book.findByIdAndUpdate(
      id,
      { title, author, description, publicationDate, pageCount },
      { new: true },
    )
      .then((book) => {
        console.log(req.body)
        if (!book) {
          res.render('error',{ 'message':'Book not found' });
        } else {
          res.redirect(`/books/${id}`);
        }
      })
      .catch((err) => {
        res.render('error',{ 'message':'Internal Server Error' });
      });
  },

  deleteBook(req, res) {
    const id = req.params.id;
    console.log(id)
    Book.findByIdAndDelete(id)
      .then((book) => {
        if (!book) {
          res.render('error',{ 'message':'Book not found' });
        } else {
          // res.redirect('/books');
          res.render('done',{ 'message':'The book has been deleted successfully' });
        }
      })
      .catch((err) => {
        res.render('error',{ 'message':'Internal Server Error' });
      });
  },

};
