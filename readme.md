# About:
Sock it! is a light-weight chat powered by socket.io and ExpressJS. Clients can connect and chat with each other.

# Feature List So Far & General Notes:
	+ Timezone conversion feature added.
	+ Integrates FontAwesome Icons by GitHub
	+ Displays currently logged in users.
	+ New users fade in.
	+ Maintains chat history (100 entries).
	+ Logoff event fades out users.
	+ Timestamps added to messages.
	+ Uses Bootstrap and Bootstrap Theme.

## Features To Add:

	- Use keycodes (see Pacman project) to do typing detection so users
	can see '{{username}} is typing...'
	- Clean up mobile experience so chat displays cleaner -- change the way users are displayed?
	- Create 1-1 chats when clicking users.
	- Fade grey when logout (utilize jQuery change class)

## Bugs list:

	- Mobile-issue: If user types too long of a message, it gets erased and the line empties and they have to start over (why does this happen?)

	- If user waits to enter name, the socket connection seems to timeout and the user's chats do not post.
