/*
This is the JS secondary sockets file. This file interacts with our primarys ockets file (sends and receives events) and appends data to the DOM in the View. Some basic Username validations are also contained in this file. This file changes what the user sees or experiences in the chatroom.
*/



$(document).ready(function() {
	// These are helper methods to keep our code organized:
	var methods = {
		updateChatText : function(message){
			/*
			Updates chat log in the DOM.

			Parameters:
			- `message` - Message to add.
			*/

			// Add message as a new <p> element:
			$('#chat').append('<p><em>(' + message.timestamp + ')</em> ' + message.message + '</p>');

			console.log("####### TESTING TIME STUFF #########");
			const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const currentTime = moment().tz(timezone).format('hh:mm:ss A');
			var offset = new Date().getTimezoneOffset();
			console.log(timezone);
			console.log(currentTime);
			console.log(offset);
			console.log(moment.tz.guess())
			console.log('--------- CONVERSTION STUFF --------');
			console.log(message.timestamp);
			var momentConv = moment(message.timestamp, moment.tz.guess());
			console.log(momentConv);
			console.log('------------------------------------');
			console.log("####################################");

			// Scroll to most recent chat entry (scrolls to bottom of chat):
			$('#chat').scrollTop($('#chat')[0].scrollHeight);
		},
		appendUser : function(user){
			/*
			Add a user to DOM's online user's list.

			Parameters:
			- `user` - User to add.
			*/

			// Add user as HTML element to DOM:
			$('#peopleOnline').append('<div id="'+user.id+'" class="online margin-bottom-sm"><h3 class="user"><i class="fa fa-user-circle-o user"></i> '+user.name+'</h3></div>');
		},
		checkDupes : function(name, users){
			/*
			Checks for existing username.

			Parameters:
			- `name` - Name of username submitted to validate.
			- `users` - List of users to search through.
			*/

			// Loop through users and if name matches, return true:
			for (var i = 0; i < users.length; i++) {
				if (name == users[i].name) {
					// send back true for duplicates found
					return true;
				}
			}
		},
	};

	// Establish Sockets Connection:
	var socket = io.connect();
	var socketId;

	socket.on('connected', function(message){
		/*
		Listening event for new client connection.

		Parameters:
		- `message` - Message to print to client console.
		*/

		console.log('The server says,', message);
	});

	// Get existing User to check if duplicate:
	socket.emit('currentUsers');

	// Generate username prompt; but first check for any existing users:
	socket.on('returnedUsers', function(users) {
		/*
		Listening event for after existing chat users are retreived; prompts client for username and validates it.

		Parameters:
		- `users` - A list of users whom were returned and are currently in chat.
		*/

		// Prompt New User:
		var name = prompt('Enter your name to join the chat!');

		// If name is filled out, validate it:
		if (name) {

			// Check that name is less than 15 characters:
			while (name.length > 10){
				alert('Your name must be less than 10 characters, please enter a new name. 😁');
				name = prompt('Please choose a new name:');
			}

			// Check if duplicate name is detected:
			while (methods.checkDupes(name, users) == true) {
				alert('This username is taken. Try again! 😃');
				name = prompt('Please choose a unique name:');
			}

			// Set username to "chatting as" text and emit new User:
			$('#name').text(name);
			socket.emit('newUser', name);

			// Focus on message field so user can start typing:
			$('#chatMsg').focus();

		} else {
			alert('We\'re sorry, but you have to choose a name... 🙈');
			location.reload();
		}

	});

	socket.on('getUsers', function(users){
		/*
		Listen for get Users -- appends all online users to the DOM -- occurs for new client only.

		Parameters:
		- `users` - List of users online.
		*/

		// Clear out existing users (whom lack newly joined client):
		$('#peopleOnline').html('');

		// Loop through user list and add latest users to DOM (includes newly connected clients):
		for (var x in users){
			// Add user to DOM:
			methods.appendUser(users[x]);
		}

		// Loops througha all existing users, append to DOM:
		for (var i = 0; i < users.length-1; i++) {
			$('#'+users[i].id).show();
		}

		// Now, fade in client username:
		$('#'+users[users.length-1].id).fadeIn(1000);
	});

	socket.on('userJoined', function(user, message){
		/*
		Listens for newly joined user, adds them to the User's array and fades in the new User, while also updating chat log that new user has connected. This occurs for all users.

		Parameters:
		- `user` - New user who joined.
		- `message` - Join message for chat.
		*/

		// Add user to chat users:
		methods.appendUser(user);

		// Fade in new user:
		$('#'+user.id).fadeIn(1000);

		// Update chat with join message:
		methods.updateChatText(message);
	});

	// Gets full chat for newly connected client (so they can see existing chat log):
	socket.emit('getFullChat');

	socket.on('fullChat', function(chatLog){
		/*
		Listens for full chat retreival.

		Parameters:
		- `chatLog` - Chat log to send back.
		*/

		// Loop through each item in the chat log and add it to DOM:
		for (var i = 0; i < chatLog.length; i++) {
			methods.updateChatText(chatLog[i]);
		}
	});

	$('button').click(function() {
		/*
		Post chat when send button is clicked:
		*/

		// Validate that chat msg is < 0 characters:
		if ($('#chatMsg').val() < 1) {

			alert('Your message must be at least 1 character long.');

			// Prevent form submission:
			return false;

		} else {
			// Else if chat msg is greater than 1 character, go ahead and post it and clear the field:

			// Emit to chat posted and send chat message:
			socket.emit('chatPosted', $('#chatMsg').val());

			// Clear out user input:
			$('#chatMsg').val('');

			// Prevents form submission:
			return false;
		}

	});

	socket.on('updateChat', function(message){
		/*
		Listen for message and update chat with it:

		Parameters
		- `message` - This is the message to update to the chat log. This message is received containing client username and a timestamp.
		*/

		// Updates chat with new message.
		methods.updateChatText(message);
	});

	socket.on('userDisconnected', function(message){
		/*
		Listen for User Disconnect and add user has left message to chat.

		Parameters:
		- `message` - User left chat message, contains user ID as `message.id` property.
		*/

		// Fade out user:
		$('#'+message.id).fadeOut(1000);

		// Timeout delays removal of element so fadeout can complete:
		setTimeout(function(){
			$('#'+message.id).remove();
		}, 2000);

		// Updates chat text with user left message:
		methods.updateChatText(message);
	});

	// Load Portfolio:
	$(' #portfolio-link ').click( function() {
		// Loads homepage:
		window.open(
			"http://sasquat.ch",
			"_blank",
		);
	})
});
