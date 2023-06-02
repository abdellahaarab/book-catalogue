const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const userMiddleware = require('../Middleware/authMiddleware');

const path = require('path');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.get('/uploads/:filename/download', (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, '..', 'uploads', filename);
  res.download(filePath);
});

router.use(userMiddleware);
router.get('/-/new', bookController.show_CreateForm);
router.post('/', bookController.createBook);
router.get('/:id/edit', bookController.showEditForm);
router.post('/:id', bookController.updateBook);
// router.put('/:id', bookController.updateBook);
router.get('/:id/delete', bookController.deleteBook);
// router.delete('/:id', bookController.deleteBook);

module.exports = router;
