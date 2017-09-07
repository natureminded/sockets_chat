Create a multi-person chat using sockets.io and javascript :)

// setup project folder

	+ create static and views folder //DONE
	+ create empty index.ejs inside of /views //DONE
	+ create empty style.css inside of /static
	+ create empty server.js file //DONE
	+ npm init //DONE


// frame out index.ejs

	+ setup jquery script //DONE
	+ setup sockets script (we'll need this) //DONE
	+ setup script tag with doc ready //DONE
	+ alert popup to capture name - store as 'name' //DONE
	+ div id='peopleOnline' //DONE
	+ load page and show box with name of user who logged in (and green border) //DONE
	+ have box 'fadeIn' //DONE
	+ div with grey frame, id='chat' //DONE
	+ form text field, name='chatMsg' //DONE
	+ form button, value ='Send' (return none on your buttons to keep from needing form route) //DONE
	+ add sockets to script area //DONE


// build out server.js

	+ npm install all dependencies //DONE
	+ require dependencies //DONE
	+ setup static and views folder //DONE
	+ setup ejs //DONE
	+ setup server listen //DONE
	+ setup sockets //DONE
	+ test //DONE


// client emits and listeners:

	+ emit newUser //DONE
	+ listen updateUsers //DONE
	+ emit chatPosted //DONE
	+ listen updateChat //DONE
	+ listen userDisconnected //DONE


// server emits and listeners:

	+ listen newUser // DONE
	+ global emit updateUsers //DONE
	+ listen chatPosted //DONE
	+ emit updateChat //DONE
	+ listen disconnnect //DONE
	+ emit userDisonnected //DONE



/*

// Feature List So Far & General Notes:
	
	+ display currently logged in users
	+ new users fade in
	+ chat history (100 entries) 
	+ logoff event fades out users
	+ timestamps added to messages
	+ increases in efficiency:
		
		+ Before: 
			When a new user was created, this user was added to the users list and the entire list was globally emitted to all users and user list updated.
		+ After: 
			Instead of sending a full list to every person every time, only new users receive this full list. Existing users only receive the new user.
		
		+ Before: 
			No chat log / then endless history size.
		+ After: 
			Chat history limited to 100 entires.

// Features To Add:

	1) Use keycodes (see Pacman assignment) to do type detection so users
	can see 'so and so is typing...'

	2) Clean up visual display / make it look super cool!

	3) Display user has joined chat message (use the name)

// Bugs & Things To Improve:

	1) Right now you can enter a blank name or a duplicate name. 
		Note: I attempted to solve blank name issue, but duplicate name was a bit more engrossing than I had thought, so I back-stepped
		to previous working code (right now only no blank is validated) and will come back to this feature. 
		==> Validation for names is important. Another idea:
			Would be nice as well if instead of pop-ups, there was an initial page to get the username and validate there before loading the chat...OR..a form at the top where you enter your name, it validates, and then the form disappears (using jQuery .hide or .remove)...

	2) Text area is cool - but can't bold usernames, etc...what can you do?

*/