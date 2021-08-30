Had issues getting styling on modals to work for an unspeakably long time. ...Forgot to import the css files in the relevant components... whoops.

to access the original post's id and content, i passed it as a prop into the edit post component. in the submit function, i constructed a new post object to send in the fetch request. but i kept getting an error that the method was forbidden and it wasn't editing. it was trying to fetch to /api/posts/undefined instead of /api/posts/${post.id}. I used to some console.logs to see what 'post' was outside my function, then again just before the fetch request... inside my function, it had no id property! because i was using the same variable name in my fx as the prop, it was being replaced with the id-less object thanks to blockscoping. easily solved by changing the var name lol

deletes on comments are not showing up immediately/dynamically. the page has to be refreshed for the deletion to show :(

edits weren't showing right away then....edits show immediately but after refactoring, edit button now turns all comments to edit mode...
solution: instead of passing the comments as props from CommentList to Comment, have comment fetch post by the id passed to it, then refetch whent comment-edit-mode state changes.

putting the comment contents into a grid is causing issues with spacing between content and details for the last comment in the list.
    i had accidentally put the bottom border div inside the 'comment' class div

despite ordering comments by created_at date in the api route, if a comment is edited, it gets reorderd in the list displayed on the post page to the end
