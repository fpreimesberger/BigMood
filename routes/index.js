var express = require('express');
var router = express.Router();
 // <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>


// playlist arrays here
let angsty = '<iframe src="https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX3YSRoSdA634" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>';

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Big_Mood' });
});

// playlists and moods
router.get('/playlist/happy', function(req, res, next) {
  res.render('playlist/happy', { mood: 'happy' });
});
router.get('/playlist/angsty', function(req, res, next) {
  res.render('playlist/angsty', { mood: 'angsty', playlist: angsty });
});
router.get('/playlist/sad', function(req, res, next) {
  res.render('playlist/sad', { mood: 'sad' });
});
router.get('/playlist/unknown', function(req, res, next) {
  res.render('playlist/unknown', { mood: '???' });
});

// when user hits submit link, it goes to a process.hbs for sending to MS api
router.post('/process', function(req, res, next) {
  link = JSON.stringify(req.body['link']);
  // link = req.body.toString();
  console.log(link);
  return res.render('./process', {link: link});
});

router.post('/playlist', function(req, res, next) {
  // var formText = $("#responseTextArea").val();
  var formText = document.getElementById("responseTextArea").value;
  console.log(formText);
  // var emotion;
  // if formText==='anger' || formText==='contempt' || formText==='disgust' || formText==='fear' {
    // emotion = 'angsty';
  // } if formText==='happiness' || formText==='surprise' {
  //   emotion = 'happy';
  // } if formText==='sadness' {
  //   emotion = 'sad';
  // }else {
  //   emotion='unknown';
  // }

  return res.render('./playlist/'+emotion);
})


module.exports = router;
