var express = require('express');
var router = express.Router();
var rp = require('request-promise');

const angsty_music = ["https://open.spotify.com/embed/user/spotify/playlist/5s7Sp5OZsw981I2OkQmyrz?si=fwtlA-uTQuSMgOwjW_K77w", "https://open.spotify.com/embed/user/1264038079/playlist/2vivknVOeJD7BUYnnuztrE","https://open.spotify.com/embed/user/natfrickfrack/playlist/3MqDZ6qDEtGp3JIf34cLQW" ];
const happy_music = ["https://open.spotify.com/embed/user/sonymusicuk/playlist/5njm69gKd9t3RzpBFafjOL", "https://open.spotify.com/embed/user/casafebusplm/playlist/7dlDBSON8kWYTu24fIspyK", "https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWTigpPD9perY", "https://open.spotify.com/embed/user/ivarz123/playlist/0kWycnqEfYA31P87pJBtA8"];
const sad_music = ["https://open.spotify.com/embed/user/pauloakaseiji/playlist/6gT2fQF1EVvCFwKTRPCQaA", "https://open.spotify.com/embed/user/chalkyboness/playlist/4slmOJp5zJRjT03bXG4VRV", "https://open.spotify.com/embed/user/johannamoes1/playlist/5ar0YiuBQm4lkOJ4wPRaJg"];

// home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Big_Mood' });
});

// playlists and moods; get random playlist from category
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

function getMax(json) {
  var max = Object.keys(json)[0];
  for (key in json) {
    if (json[key] > json[max])
      max = key;
  }
  return max;
}

function getEmotion(url) {
    return rp({
    method: 'POST',
    uri: 'https://southcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=emotion',
    body: {
        'url': url
    },
    headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': process.env.APIkey
    },
    json: true
  }).then((data) => {
    console.log(JSON.stringify(data));
    let emotions = data[0].faceAttributes.emotion;
    var emotion = getMax(emotions);
    if ( emotion ==='happiness' ) {
          return 'happy';
        } else if (emotion ==='surprise') {
          return 'happy';
        } else if (emotion === 'sadness') {
          return 'sad';
        } else if (emotion === 'neutral') {
          return 'unknown';
        } else {
          return 'angsty';
        }
  }).catch(function(err) {
    console.log(`Something went wrong ${err}`);
  })
}

router.get('/find', function(req, res, next) {
  var url = req.query.link;
  console.log(`router post ${url}`);
  var emotion = getEmotion(url).then((data) => {
    if (data == 'happy') {
      res.redirect('/playlist/happy');
    } else if (data == 'sad') {
      res.redirect('/playlist/sad');
    } else if (data == 'unknown') {
      res.redirect('/playlist/unknown');
    } else if (data == 'angsty') {
      res.redirect('/playlist/angsty');
    } else {
      res.redirect('/playlist/unknown');
    }
  });

})

module.exports = router;
