var express = require('express');
var router = express.Router();
var rp = require('request-promise');

const angsty_music = ["https://open.spotify.com/embed/user/spotify/playlist/5s7Sp5OZsw981I2OkQmyrz?si=fwtlA-uTQuSMgOwjW_K77w", "https://open.spotify.com/embed/user/1264038079/playlist/2vivknVOeJD7BUYnnuztrE","https://open.spotify.com/embed/user/natfrickfrack/playlist/3MqDZ6qDEtGp3JIf34cLQW", "https://open.spotify.com/embed/user/ben20.04/playlist/4edVshwewGce80TESacS9F",
"https://open.spotify.com/embed/user/21ujjmbzahnw3woyvlimefbvy/playlist/7EWgorEYHDnQ9PZrzdfi5F", "https://open.spotify.com/embed/user/12121308383/playlist/24vORFqVMJn3fvuZ42vYbf", "https://open.spotify.com/embed/user/daniibaaee/playlist/5V8WRZ8SnYX3ZpCkdFpywQ", "https://open.spotify.com/embed/user/lindseyrem/playlist/6UN0WHT1AmnbUU3cidiNQE", "https://open.spotify.com/embed/user/kellynn93/playlist/7B6YdYUWiNJSJbHXT5fGqe", "https://open.spotify.com/embed/user/3wrev7soqpm9el0apishufs48/playlist/2OJGkooZWoVLY1epOYQMwH"];
const happy_music = ["https://open.spotify.com/embed/user/sonymusicuk/playlist/5njm69gKd9t3RzpBFafjOL", "https://open.spotify.com/embed/user/casafebusplm/playlist/7dlDBSON8kWYTu24fIspyK", "https://open.spotify.com/embed/user/spotify/playlist/37i9dQZF1DWTigpPD9perY", "https://open.spotify.com/embed/user/ivarz123/playlist/0kWycnqEfYA31P87pJBtA8", "https://open.spotify.com/embed/user/22x5qvol7fqzyhmb6mbztujva/playlist/62xOkL9o4OBao8QQAmAXCc",
"https://open.spotify.com/embed/user/1223420143/playlist/3SBeEnPkuLARQSXavG0N6D", "https://open.spotify.com/embed/user/shogonakamura/playlist/0kIpY9U0B5qb2TEej47m9w", "https://open.spotify.com/embed/user/ninjasexparty69/playlist/7llz8kH5ybJciZuzy3AL4x", "https://open.spotify.com/embed/user/morganmasson/playlist/3tXlIhWnzbSxZpInSBjPHN", "https://open.spotify.com/embed/user/anacaroliis/playlist/6SANdSgAnVtFaOEvbExsuB",
 "https://open.spotify.com/embed/user/cb7eyowtu8j63a4csvy4rretd/playlist/6jKlceAKxsgF3GMiIZrZ3N", "https://open.spotify.com/embed/user/dklzs0ti39k5qot4jgclj7u6m/playlist/7f52qPaGfS7uK60tafm3SB", "https://open.spotify.com/embed/user/aydinorkan/playlist/7yUjvl5ohnioUCgvcnxUtl"];
const sad_music = ["https://open.spotify.com/embed/user/pauloakaseiji/playlist/6gT2fQF1EVvCFwKTRPCQaA", "https://open.spotify.com/embed/user/chalkyboness/playlist/4slmOJp5zJRjT03bXG4VRV", "https://open.spotify.com/embed/user/johannamoes1/playlist/5ar0YiuBQm4lkOJ4wPRaJg", "https://open.spotify.com/embed/user/1249641328/playlist/6fsonevOJuwfTcfIujOf6O",
"https://open.spotify.com/embed/user/047hbafhwk97xlds7n5tdmijd/playlist/34T4o54hCQfOcG0Vj9KTXS", "https://open.spotify.com/embed/user/carrieunderwoodmusic/playlist/3yaarXoPzXWHxge2DLTBzg", "https://open.spotify.com/embed/user/anna2001henningstad/playlist/1T3IgiJ4cYzwyD26hTAnqo",
"https://open.spotify.com/embed/user/alexatet/playlist/40cUIqx18hlqL7mhiURFdm", "https://open.spotify.com/embed/user/jelly-fiish/playlist/5qNKY6PoX46xf4VhLCGfQs", "https://open.spotify.com/embed/user/61xxsyqmkrlbzt7v16eqc87hn/playlist/0k1riNjmI5bF2eAP6vl6O4", "https://open.spotify.com/embed/user/1248081877/playlist/7GwWixPjhQew1sW0660oOx", "https://open.spotify.com/embed/user/leah_jannetti/playlist/6yzfHGOsyzTx0JlGwqeNXI", "https://open.spotify.com/embed/user/graciestewart_/playlist/1X03h2aW44mNHFJVOv5J1o", "https://open.spotify.com/embed/user/124820304/playlist/3J5HcM300BiHVqjgbqBDaC", "https://open.spotify.com/embed/user/1132767475/playlist/3F84iL7FFeXrKWDrmEfOGp"];

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
