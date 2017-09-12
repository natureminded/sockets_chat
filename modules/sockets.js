/*
This is the primary sockets file. This file sets up socket.io and emits the first events connecting to a client. This file grabs our helpers module (see `./helpers.js`) and creates, updates, modifies or deletes chat related data, sending or receiving events to/from our secondary javascript file (`../static/main.js`). This file does not update the DOM, but rather acts a bit more like the back-end server (although it lives on the front-end).
*/

module.exports = function(server){
	// IMPORT CUSTOM HELPERS MODULE
	var helpers = require('./helpers.js')();

	// SETUP SOCKETS
	var io = require('socket.io').listen(server);

	// SERVER SOCKETS LISTENERS AND EMITS:
	io.sockets.on('connection', function(socket){

		// Emit Sockets Connected Confirmation:
		socket.emit('connected', 'Welcome to the chat powered by javascript and sockets! :)');

		socket.on('newUser', function(name){
			/*
			Listen for new user (client) connection and emit new user to all.

			Parameters:
			- `name` - Name of user (client) whom joined chat.
			*/

			// Add user to user's array:
			helpers.users.push({name: name, id: socket.id});

			// Make a join message with timestamp:
			var message = {id: socket.id, timestamp: helpers.getCurrentTime(), name: name, message: '<strong">👤' + name + ' has joined.</strong>'};

			// Universal Emit User Joined for all users to update chat:
			io.emit('userJoined', {name: name, id: socket.id}, message);

			// Get all users for client:
			socket.emit('getUsers', helpers.users);
		});

		socket.on('currentUsers', function() {
			/*
			Gets all current users.
			*/

			// Send back current users list to client:
			socket.emit('returnedUsers', helpers.users);
		});

		socket.on('getFullChat', function(){
			/*
			Listens for getting full chat for newly connected client.
			*/

			// Sends back full chat log to client:
			socket.emit('fullChat', helpers.chatLog);
		});

		socket.on('chatPosted', function(messageText){
			/*
			Listen for chat message from a client, and emit updated chat to all clients.

			Parameters:
			- `messageText` - Message submitted by client as chat entry.
			*/

			helpers.searchUsers(socket, helpers.users, function(user){
				/*
				Search for client in users list:

				Parameters:
				- `socket` - Socket connection of client who submitted chat.
				- `helpers.users` - Users array of current users.
				- `callback(user)` -- Callback function to run after user is found, containing client `user` who submitted chat.
				*/

				// Create message variable to hold new message; add a time stamp and the client's user ID:
				var message = {id: user.id, timestamp: helpers.getCurrentTime(), name: user.name, message: '<span class="name">' + user.name + ':</span> ' + messageText };

				// Add new message to chat log:
				helpers.chatLog.push(message);

				// Update ALL user's chat log with new message:
				io.emit('updateChat', message);
			});

			// Reduce chat log if greater than 100 entries:
			helpers.reduceChatLog(helpers.chatLog, 100);
		});

		socket.on('disconnect', function(){
			/*
			Listen for client disconnect and emit to all users other than client.
			*/

			helpers.searchUsers(socket, helpers.users, function(user){
				/*
				Find client in user list, and then run callback, which contains retreived user as an argument.
				*/

				// Create user disconnect message containing timestamp:
				var message = {id: user.id, timestamp: helpers.getCurrentTime(), name: user.name, message: '<em>✌️' + user.name + ' has left the chat.</em>'};

				// Add disconnect message to chat log:
				helpers.chatLog.push(message);

				// Broadcast to all other sockets that user is disconnected:
				socket.broadcast.emit('userDisconnected', message);

				// Remove user (former client) from user array:
				helpers.users.splice(helpers.users.indexOf(user), 1);
			});
		});
	});
};
