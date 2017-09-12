# About:
Sock it! is a javascript powered chat using socket.io. Clients can connect and chat with each other.

# Feature List So Far & General Notes:
	+ Integrates FontAwesome Icons by GitHub
	+ Displays currently logged in users.
	+ New users fade in.
	+ Maintains chat history (100 entries).
	+ Logoff event fades out users.
	+ Timestamps added to messages.
	+ Uses Bootstrap and Bootstrap Theme.

## Features To Add:

	1. Use keycodes (see Pacman assignment) to do type detection so users
	can see 'so and so is typing...'
	2. Clean up mobile experience so chat isn't so far down page -- change the way users are displayed?
	3. Create 1-1 chats when clicking users.

## Bugs list:
	- If user waits to enter name, the socket connection seems to timeout and the user's chats do not post.

### Need to Do:

- Use saved link to make sure height is full width AND scrollable (right now only full-width, and adding to the chat increases the size of the chat larger and larger and larger...)
- Fade grey when logout (change class)
- Change logged-on color to a gradient green?
- Add footer with your website/credits.
- **Don't forget to create LICENSE on GitHub for THIS and for MEAN HIKE**
