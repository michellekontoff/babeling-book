import React, { useState, useEffect, useContext } from "react";
import { PostPageContext } from '../../context/PostPageContext'
import Comment from "./Comment";
import { useParams } from "react-router";

import "./commentList.css";

export default function CommentList({ postOwnerId, addComment, userId }) {
   const params = useParams();
   const [comments, setComments] = useState([]);
//    const { setRefreshComments } = useContext(PostPageContext)

   async function getPostComments() {
      const res = await fetch(`/api/posts/${params.postId}/comments`);
      console.log('i ran')
      if (res.ok) {
         const data = await res.json();
         return data.comments
      } else {
         return "Something went wrong.";
      }
   }

   useEffect(() => {
        
      let comments = getPostComments();
      setComments(comments)

   }, []);

   return (
      <>
         {comments?.length ? (
            <div className="comment-list">
               {comments?.map((comment, i) => {
                  return (
                     <div key={comment.id}>
                        <div  className="comment">
                           <Comment
                              commentId={comment.id}
                              postOwnerId={postOwnerId}
                              userId={userId}
                              />
                              {comments[i + 1] ?
                              <div key={i} className='comment__border'></div>
                              : null}
                        </div>
                     </div>
                  );
               })}
            </div>
         ) : null}
      </>
   );
}
