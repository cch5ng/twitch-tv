var channel0 = "freecodecamp";
var channel1 = "medrybw";

function isStreaming(channel) {
  var streamContent;
  var url = 'https://api.twitch.tv/kraken/streams/' + channel;
      
  var jqxhr = $.ajax({
    url: url,
    dataType: 'jsonp'
  }).done(function(result) {
    console.log(result);
  }).fail(function(err) {
    console.log('error: ' + err);
  }).always(function() {
    //console.log('completed');
  });
}

//isStreaming(channel0);
isStreaming(channel1);