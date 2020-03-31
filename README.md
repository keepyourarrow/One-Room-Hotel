My biggest frontend project that was done with React.js.
I'm using functional components, Hooks and React Context to lift my state.
The purpose of this project is to learn and develop new skills and showcase them to others,
not to mention that it's a good experience to work with a big project.

There is no data so no rooms would be displayed.
To start a project - press the Populate Data button on the top.
Rooms should appear now.
The purpose of the site for a user is to find a room that he likes and order it.
You can do a basic things that a non-logined user can do. Like viewing rooms.
But you can only order one if you are registered.

You can signup or login as 2 preexisting users.
As a normal user:
username: normaluser
password: normaluser

Or as an admin:
username: admin
password: admin

Admin has more tools that he can use like creating/deleting rooms.

Restore - will restore everything back to normal. That means all users or rooms
that were created would be gone.

Everything is stored in local storage, so you don't lose progress upon reload.

P.S i know that it's terrible to store users and sensitive information in general in local storage where anyone can access it,
but i didn't want to include backend in this app, but i still wanted to do some sort of storage so user won't experience a really
painful experience of their progress being reset every time.
