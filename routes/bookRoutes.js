const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.get('/new', bookController.showCreateForm);
router.post('/', bookController.createBook);
router.get('/:id/edit', bookController.showEditForm);
router.post('/:id', bookController.updateBook);
// router.put('/:id', bookController.updateBook);
router.delete('/:id', bookController.deleteBook);

module.exports = router;
