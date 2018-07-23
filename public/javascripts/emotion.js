// render playlist page
$('#urlEntry').submit(function(event) {
  event.preventDefault()
  let link = $('#link').val()
  let emotion = getEmotion(link)
})

// get most apparent emotion from api's json output
function getMax(json) {
  var max = Object.keys(json)[0];
  for (key in json) {
    if (json[key] > json[max])
      max = key;
  }
  return max;
}

// use api
function getEmotion(url) {
    // api auth
    var subscriptionKey = "28b26b3306c2451890069b6a083e3c0f";
    var uriBase = "https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect";

    // request parameters
    var params = {
        "returnFaceId": "true",
        "https":"https://fee.org/media/24410/happy.jpg?anchor=center&mode=crop&height=656&widthratio=2.1341463414634146341463414634&rnd=131497055260000000",
        "returnFaceLandmarks": "false",
        "returnFaceAttributes": "emotion"
    };

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

    .done(function(data) {
        // results showing % of each emotion in json file
        let emotions = data[0].faceAttributes.emotion;
        // top result
        $("#responseTextArea").val(getMax(emotions));
        var emotion = getMax(emotions);
        var output;

        // sort out emotions and redirect
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

        // reroute
        window.location.replace('/playlist/'+output);
    });
};
