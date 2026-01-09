var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET chat page - SPA route support */
router.get('/chat', function(req, res) {
  res.render('index', { title: 'Chat' });
});

/* GET history page - SPA route support */
router.get('/history', function(req, res) {
  res.render('index', { title: 'History' });
});

/* GET nutrition page - SPA route support */
router.get('/nutrition', function(req, res) {
  res.render('index', { title: 'Nutrition' });
});

/* GET settings page - SPA route support */
router.get('/settings', function(req, res) {
  res.render('index', { title: 'Settings' });
});

module.exports = router;
