# About:
Sock it! is a javascript powered chat using socket.io. Clients can connect and chat with each other.

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

	- Use keycodes (see Pacman assignment) to do type detection so users
	can see 'so and so is typing...'
	- Clean up mobile experience so chat isn't so far down page -- change the way users are displayed?
	- Create 1-1 chats when clicking users.
	- Fade grey when logout (change class)

## Bugs list:
	- Mobile-issue: If user types too long of a message, it gets erased and the line empties and they have to start over (why does this happen?)

	- Mobile Breakpoint: The screen widths of 992px -> 1006px have some issues at this breakpoint. Anything bigger is OK, anything smaller is OK, but this one window of width causes the user list and top button to stack irregularly.

	- If user waits to enter name, the socket connection seems to timeout and the user's chats do not post.
