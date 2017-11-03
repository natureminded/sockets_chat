# About:
Sock it! is a light-weight chat powered by Socket.io, Node and Express. Clients can connect and chat with each other.

# Feature List So Far & General Notes:
- Timezone conversion feature added.
- Integrates FontAwesome Icons by GitHub
- Displays currently logged in users.
- New users fade in.
- Maintains chat history (100 entries).
- Logoff event fades out users.
- Timestamps added to messages.
- Uses Bootstrap and Bootstrap Theme.

## Features To Add:

- Utilize keycodes (see Pacman project) to create typing detection feature so that users can see '{{username}} is typing...'.
- Clean up mobile experience so chat displays cleaner -- change the way users are displayed (especially multiple users).
- Create 1-1 chats (direct messages) when clicking users.
- Fade grey when logout (utilize jQuery change class).
- Add emoji selector, or image or GIF uploader.

## Bugs list:

- Mobile-issue: If user types too long of a message, it gets erased and the line empties and they have to start over (why does this happen?).

- If user waits to enter name, the socket connection seems to timeout and the user's chats do not post.
