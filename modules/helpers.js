/*
This file is a helper module to our primary socket.io file ('./sockets.js'), and stores all chat data (user and chat text), and assists in some basic chat and user actions.
*/
module.exports = function(moment){
	var jstz = require('jstimezonedetect');
	return {
		users : [], // Stores our chat users.
		chatLog : [], // Stores the actual chat log.
		reduceChatLog : function(log, length){
			/*
			Reduces chat `log` length when it reaches the value of `length` -- reduces the chat log by bumping out the oldest item in the chat log array (deletes it).

			Parameters:
			- `log` - Chat log to reduce.
			- `length` - Maximum chat length permitted.
			*/

			// If `log` length is greater than `length`, delete oldest item in array:
			if (log.length > length){
				log.shift(); // removes first element in array
			}

		},
		getCurrentTime : function(){
			/*
			Returns current time as locale date string.
			*/

			const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const currentTime = moment().tz(timezone).format('hh:mm:ss A');
			var offset = new Date().getTimezoneOffset();

			const tz = jstz.determine();

			console.log('$$$$$$ TIME STUFF $$$$$$');
			console.log(timezone);
			console.log(currentTime);
			console.log(offset);
			console.log(moment.tz.guess())
			console.log('------------------------');
			console.log(tz.name());
			console.log('------------------------');
			console.log('$$$$$$$$$$$$$$$$$$$$$$$$');
			return currentTime;

		},
		searchUsers : function(socket, usersList, callbackFunction){
			/*
			Loops through user list looking for current client socket connection; when user is found, run callback.

			Parameters:
			- `socket` - Socket connection of current client.
			- `userList` - A list of users to search.
			- `callbackFunction` - A callback function to run when client is found, sending along found user as argument.
			*/

			// Loop through user list:
			for (var i = 0; i < usersList.length; i++){
				// If client is found, run callback function:
				if (usersList[i].id == socket.id){
					callbackFunction(usersList[i]);
				}
			};
		},
	};
};
