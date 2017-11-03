# About:
Sock it! is a light-weight chat powered by Socket.io, Node and Express. Clients can connect and chat with each other.

# Feature:
- Timezone conversion for user timestamps.
- Displays logged in users.
- New users fade in when joining chat.
- Chat history is maintained for 100 entries.
- Users who logoff fade out.
- Bootstrap, Bootstrap United theme, FontAwesome icon set.

## Features To Add / Ideas:

- User typing detection feature which Uses keycodes (see Pacman project) to create '{{username}} is typing...' when users are entering messages.
- Clean up mobile experience so chat displays cleaner -- change the way users are displayed (especially multiple users).
- Create 1-1 chats (direct messages) when clicking users.
- Fade grey when logout (utilize jQuery change class).
- Add emoji selector, or image or GIF uploader.
- Change way chat log is stored or kept for longer chat transcripts.

## Bugs list:

- Mobile-issue: If user types too long of a message, it gets erased and the line empties and they have to start over (why does this happen?).

- If user waits to enter name, the socket connection seems to timeout and the user's chats do not post.
