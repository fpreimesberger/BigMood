var express = require('express');
var router = express.Router();
 // <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

 // var emotionApiString = {
 //   x:""
 // };

// playlist arrays here
// const neutral_music = [<iframe src="https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX1s9knjP51Oa?si=FQwyO_LjRI6iYDaks3f0Bw" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>,
// <iframe src="https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DXbIGqYf7WDxP?si=ahoexHG0QHu-9Q3BSOeOdA"  width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>,
// <iframe src="https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DX6VdMW310YC7?si=mwbD53sCQQ-R_4TzzJWTwQ"  width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>];
//
// const angry_music = [<iframe src="https://open.spotify.com/embed/user/spotify/playlist/5s7Sp5OZsw981I2OkQmyrz?si=fwtlA-uTQuSMgOwjW_K77w"  width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>,
// <iframe src=""  width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>,
// <iframe src=""  width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>];
//
// const surprise_music = [<iframe src="https://open.spotify.com/embed/user/jodeecerdaa/playlist/5UwjklSXrLmiWWNvC6Rw3Q?si=-HOy14eXSiizkXfcxu3KdA"  width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>,
// <iframe src="https://open.spotify.com/embed/user/kenneth366s/playlist/3GNM6A3gHogLR5197y6aeq?si=_oIC2fTyTFa6wU2sVbnZwg"  width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>,
// <iframe src="https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DZ06evO2vjEpW?si=vq0RrRuMR3-opVkaOSKGbw"  width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>];
//


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Big_Mood' });
});

// playlists and moods
router.get('/playlist/happy', function(req, res, next) {
  // var playlist = surprise_music[Math.floor(Math.random()*surprise_music.length)];.
  res.render('playlist/happy', { mood: 'happy' });
});
router.get('/playlist/angsty', function(req, res, next) {
  res.render('playlist/angsty', { mood: 'angsty'});
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
  emotion = emotionApiString.x;
  console.log('hey');
  console.log(emotion);

  
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

// CHANGE LATER
  return res.render('./playlist/unknown', {mood: '???'});
})


module.exports = router;
