Had issues getting styling on modals to work for an unspeakably long time. ...Forgot to import the css files in the relevant components... whoops.

to access the original post's id and content, i passed it as a prop into the edit post component. in the submit function, i constructed a new post object to send in the fetch request. but i kept getting an error that the method was forbidden and it wasn't editing. it was trying to fetch to /api/posts/undefined instead of /api/posts/${post.id}. I used to some console.logs to see what 'post' was outside my function, then again just before the fetch request... inside my function, it had no id property! because i was using the same variable name in my fx as the prop, it was being replaced with the id-less object thanks to blockscoping. easily solved by changing the var name lol

deletes on comments are not showing up immediately/dynamically. the page has to be refreshed for the deletion to show :(
