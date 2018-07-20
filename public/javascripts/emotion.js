
var emotionApiString = {
  x:""
};

function getMax(json) {
  var max = Object.keys(json)[0];
  for (key in json) {
    if (json[key] > json[max])
      max = key;
  }
  return max;
}

function getEmotion(url) {
    var subscriptionKey = "28b26b3306c2451890069b6a083e3c0f";

    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

    // Request parameters.
    var params = {
        "returnFaceId": "true",
        "https":"https://fee.org/media/24410/happy.jpg?anchor=center&mode=crop&height=656&widthratio=2.1341463414634146341463414634&rnd=131497055260000000",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "emotion"
    };//previews.123rf.com/images/bowie15/bowie151401/bowie15140100071/39843011-angry-face-man.jpg

    // JQUERY THANG
    $.ajax({
        url: uriBase + "?" + $.param(params),
        beforeSend: function(xhrObj){
            xhrObj.setRequestHeader("Content-Type","application/json");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        type: "POST",
        data: '{"url": ' + '"' + url + '"}',
    })

    // var emotionApiString;

    .done(function(data) {
        // Show formatted JSON on webpage.
        // Results showing % of each emotion
        let emotions = data[0].faceAttributes.emotion;
        // console.log('TESTTTTT');
        // console.log(JSON.stringify(emotions));

        // Top result
        $("#responseTextArea").val(getMax(emotions));
        var emotion = getMax(emotions);
        console.log(emotion);
        var output;

        // SORT OUT EMOTIONS AND REDIRECT
        if ( emotion ==='happiness') {
          output = 'happy';
        } else if (emotion ==='surprise') {
          output = 'happy';
        } else if (emotion === 'sadness') {
          output = 'sad';
        } else if (emotion === 'neutral') {
          output = 'unknown';
        } else {
          output='angsty';
        }

        window.location.replace('/playlist/'+output);
        // console.log(JSON.stringify(emotionApiString.x));

        //
        // router.post('/playlist', function(req, res, next) {
        //   console.log('HEYYYYY');
        //   console.log(JSON.stringify(emotion));
        // // CHANGE LATER
        //   return res.render('./playlist/unknown', {mood: '???'});
        // })



    });
};
