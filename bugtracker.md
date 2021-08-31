Had issues getting styling on modals to work for an unspeakably long time. ...Forgot to import the css files in the relevant components... whoops.

to access the original post's id and content, i passed it as a prop into the edit post component. in the submit function, i constructed a new post object to send in the fetch request. but i kept getting an error that the method was forbidden and it wasn't editing. it was trying to fetch to /api/posts/undefined instead of /api/posts/${post.id}. I used to some console.logs to see what 'post' was outside my function, then again just before the fetch request... inside my function, it had no id property! because i was using the same variable name in my fx as the prop, it was being replaced with the id-less object thanks to blockscoping. easily solved by changing the var name lol

deletes on comments are not showing up immediately/dynamically. the page has to be refreshed for the deletion to show :(

edits weren't showing right away then....edits show immediately but after refactoring, edit button now turns all comments to edit mode...
solution: instead of passing the comments as props from CommentList to Comment, have comment fetch post by the id passed to it, then refetch whent comment-edit-mode state changes.

putting the comment contents into a grid is causing issues with spacing between content and details for the last comment in the list.
    i had accidentally put the bottom border div inside the 'comment' class div

delete comment isn't causing a refresh of the comments list. so if you delete the last comment, there's an empty box. also, the border remains even if the content is gone.
    plan: refetch comments on delete. have context/provider fetch the comments once with a useEffect. comments and setComments get passed down to commentlist and all its children. in comment.js, after deleting comment, make new fetch to comments and setcomments again. can also include post, and postowner info in context
    --  IT WORKED!!! each crud function calls getPostComments when submitted :D

in debugging delete comment, discovered that apparently my fetch to get comments was being called infinitely(?) and yet despite this, comments aren't refreshing after delete. doesn't fetch forever when using postman
    instead of calling setComments in the getPostComments function, i needed to call setComments in the useEffect

editing comment rearranges the order of the comments... comments just out of order in general.
    comments weren't sorting correctly in backend. fixed by changing query order_by from created_at to id.
