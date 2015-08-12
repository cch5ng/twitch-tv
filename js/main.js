//better not to return from the xhr.done() function
//why is the return always undefined??

// var channel0 = "freecodecamp";
// var channel1 = "medrybw";
// var channel2 = 'Habathcx';

var channelNames = ['freecodecamp', 'storbeck', 'terakilobyte', 'habathcx','RobotCaleb','comster404','brunofin','thomasballinger','noobs2ninjas','beohoff'];

var channels = [];

function isStreaming(channel) {
  var requestUrl = 'https://api.twitch.tv/kraken/streams/' + channel;// + '?callback=result';
  var channelInfo;
  var channelObj = {};
      
  var jqxhr = $.ajax({
    url: requestUrl,
    dataType: 'jsonp'
  }).done(function(result) {
    
    channelObj.name = channel;

    if (result.stream !== null) {
//       console.log(result.stream);
//       console.log(result.stream.channel.status);
      channelObj.streamStatus = result.stream.channel.status;
      channelObj.url = result.stream.channel.url;          
    } else {
      channelObj.streamStatus = '';
      channelObj.url = 'http://www.twitch.tv/' + channel;
//console.log(result.stream);
    }
    
    channels.push(channelObj);
    //if (channels.length === channelNames.length) {
      console.log(channels);          
    //}
  }).fail(function(err) {
    console.log('error: ' + err);
  }).always(function() {
    //console.log('completed');
    //return channelInfo.stream;

  });
            
}

channelNames.forEach(function(chan) {
	isStreaming(chan);
});
//console.log(channels);


// isStreaming(channel0);
// isStreaming(channel1);
// isStreaming(channel2);