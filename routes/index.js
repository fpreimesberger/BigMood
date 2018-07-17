var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Big_Mood' });
});

router.get('/playlist/happy', function(req, res, next) {
  res.render('playlist/happy', { mood: 'Happy' });
});
router.get('/playlist/angsty', function(req, res, next) {
  res.render('playlist/angsty', { mood: 'Angsty' });
});
router.get('/playlist/sad', function(req, res, next) {
  res.render('playlist/sad', { mood: 'Sad' });
});
router.get('/playlist/unknown', function(req, res, next) {
  res.render('playlist/unknown', { mood: 'Unknown' });
});

module.exports = router;
