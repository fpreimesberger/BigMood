var express = require('express');
var router = express.Router();

const angsty_music = ["https://open.spotify.com/embed/user/spotify/playlist/5s7Sp5OZsw981I2OkQmyrz?si=fwtlA-uTQuSMgOwjW_K77w", "https://open.spotify.com/embed/user/1264038079/playlist/2vivknVOeJD7BUYnnuztrE","https://open.spotify.com/embed/user/natfrickfrack/playlist/3MqDZ6qDEtGp3JIf34cLQW" ];
const happy_music = ["https://open.spotify.com/embed/user/sonymusicuk/playlist/5njm69gKd9t3RzpBFafjOL", "https://open.spotify.com/embed/user/casafebusplm/playlist/7dlDBSON8kWYTu24fIspyK", "https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWTigpPD9perY", "https://open.spotify.com/embed/user/ivarz123/playlist/0kWycnqEfYA31P87pJBtA8"];
const sad_music = ["https://open.spotify.com/embed/user/pauloakaseiji/playlist/6gT2fQF1EVvCFwKTRPCQaA", "https://open.spotify.com/embed/user/chalkyboness/playlist/4slmOJp5zJRjT03bXG4VRV", "https://open.spotify.com/embed/user/johannamoes1/playlist/5ar0YiuBQm4lkOJ4wPRaJg"];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Big_Mood' });
});

// playlists and moods
router.get('/playlist/happy', function(req, res, next) {
  var playlist = happy_music[Math.floor(Math.random()*happy_music.length)];
  res.render('playlist/happy', { mood: 'happy', playlist: playlist });
});
router.get('/playlist/angsty', function(req, res, next) {
  var playlist = angsty_music[Math.floor(Math.random()*angsty_music.length)];
  res.render('playlist/angsty', { mood: 'angsty', playlist: playlist});
});
router.get('/playlist/sad', function(req, res, next) {
  var playlist = sad_music[Math.floor(Math.random()*sad_music.length)];
  res.render('playlist/sad', { mood: 'sad', playlist: playlist });
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
