const express = require('express');
const controller = require('../controllers/navController');

const router = express.Router();

router.get('/', controller.page_index);
router.get('/members', controller.page_member);
router.get('/about', controller.page_about);
router.get('/documentation', controller.page_doc);
router.get('/download', controller.page_download);
router.get('/feedback', controller.page_feedback);
router.get('/cgu', controller.page_cgu);
router.get('/privacy', controller.page_privacy);
router.get('/legal', controller.page_legal);
router.get('/newsletter', controller.page_letter);
router.post('/feedback', controller.page_feedback_create);
router.get('/article/:id', controller.page_article);

module.exports = router;