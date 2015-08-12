//better not to return from the xhr.done() function
//why is the return always undefined??

var channelNames = ['freecodecamp', 'storbeck', 'terakilobyte', 'habathcx','RobotCaleb','thomasballinger','noobs2ninjas','beohoff', 'medrybw']; 
//the following channelNames were not recognized by twitch.tv
//'brunofin', 'comster404',

var channels = [];

function isStreaming(channel) {
  var requestUrl = 'https://api.twitch.tv/kraken/streams/' + channel;// + '?callback=result';
  var channelObj = {};
      
  var jqxhr = $.ajax({
    url: requestUrl,
    dataType: 'jsonp'
  }).done(function(result) {
    channelObj.name = channel;

    if (result.stream === null) {
      channelObj.streamStatus = '';
      channelObj.url = 'http://www.twitch.tv/' + channel;
    } else {
      channelObj.streamStatus = result.stream.channel.status;
      channelObj.url = result.stream.channel.url;
    }
    
    channels.push(channelObj);
    console.log(channels);
  }).fail(function(err) {
    console.log('error: ' + err);
  }).always(function() {
    if (channels.length === channelNames.length) {
      console.log('finished');
    }
  });
}

channelNames.forEach(function(chan) {
	isStreaming(chan);
});