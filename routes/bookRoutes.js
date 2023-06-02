const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

const path = require('path');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.get('/-/new', bookController.show_CreateForm);
router.post('/', bookController.createBook);
router.get('/:id/edit', bookController.showEditForm);
router.post('/:id', bookController.updateBook);
// router.put('/:id', bookController.updateBook);
router.get('/:id/delete', bookController.deleteBook);
// router.delete('/:id', bookController.deleteBook);

router.get('/uploads/:filename/download', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'uploads', filename);
  res.download(filePath);
});


module.exports = router;
