
var channelNames = ['freecodecamp', 'storbeck', 'terakilobyte', 'habathcx','RobotCaleb','thomasballinger','noobs2ninjas','beohoff', 'medrybw']; 
//the following channelNames were not recognized by twitch.tv
//'brunofin', 'comster404',

var channels = [];
var state = 'streaming'; //'streaming' or 'notStreaming'

function displayChannels() {


	channels.forEach(function(chan) {
		var divChannelsList = document.querySelector('.channelsList');
		var p = document.createElement('p');
		p.setAttribute('class', 'channel');

		var imgStr = '';

		if (chan.logoUrl) {
			imgStr = "<img src='" + chan.logoUrl + "' alt='logo' class='logo'>";
		} else {
			imgStr = "<img src='http://s.jtvnw.net/jtv_user_pictures/hosted_images/GlitchIcon_PurpleonWhite.png' alt='logo' class='logo'>";
		}

		var htmlStr = imgStr + " <a href='" + chan.url + "' target='_blank'>" + chan.displayName + "</a>";
		var htmlSuffix;

		if (state === 'streaming' && chan.streamStatus.length > 0) {
				htmlSuffix = " <p class='desc'>" + chan.streamStatus + "</p>";
				p.innerHTML = htmlStr + htmlSuffix;
				divChannelsList.appendChild(p);
		} else if (state === 'notStreaming' && chan.streamStatus.length === 0) {
				//htmlSuffix = ' channel is not streaming';
				p.innerHTML = htmlStr; //+ htmlSuffix;
				divChannelsList.appendChild(p);
		}
	});
}

function getDisplayNameLogo() {
	var counter = 0;

	channels.forEach(function(chan) {
		var requestUrl = 'https://api.twitch.tv/kraken/users/' + chan.name;

		var jqxhr = $.ajax({
			url: requestUrl,
			dataType: 'jsonp'
		}).done(function(result) {
			chan.displayName = result.display_name;
			if (result.logo) {
				chan.logoUrl = result.logo;
			}

			counter++;
		}).fail(function(err) {
			console.log('error: ' + err);
		}).always(function() {
			if (counter === channelNames.length) {
				console.log('finished');
				displayChannels();

				console.log('channels ar: ' + channels);
				console.log('last channel logoUrl: ' + channels[channels.length - 1].logoUrl);
			}
		});
	});
}

function isStreaming(channel) {
	var requestUrl = 'https://api.twitch.tv/kraken/streams/' + channel;
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
		//console.log(channels);
	}).fail(function(err) {
		console.log('error: ' + err);
	}).always(function() {
		if (channels.length === channelNames.length) {
			console.log('finished');
			getDisplayNameLogo();
		}
	});
}

channelNames.forEach(function(chan) {
	isStreaming(chan);
});

//event handlers
function onlineHeaderClickListener() {
	console.log('online click');
	if (state === 'notStreaming') {
		state = 'streaming';
		var divChannelsList = document.querySelector('.channelsList');
		divChannelsList.innerHTML = '';

		displayChannels();
	}
}

function offlineHeaderClickListener() {
	console.log('offline click');
	if (state === 'streaming') {
		state = 'notStreaming';
		var divChannelsList = document.querySelector('.channelsList');
		divChannelsList.innerHTML = '';

		displayChannels();
	}
}

//event listeners
var onlineHeader = document.querySelector('.online');
onlineHeader.addEventListener('click', onlineHeaderClickListener);

var offlineHeader = document.querySelector('.offline');
offlineHeader.addEventListener('click', offlineHeaderClickListener);