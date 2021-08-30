import React, { useState, useEffect, useContext } from "react";
import { useComments } from "../../context/CommentsContext";
import Comment from "./Comment";
import { useParams } from "react-router";
import CommentCreateForm from '../CommentCreateForm'
import "./commentList.css";

export default function CommentList() {
   const [addComment, setAddComment] = useState(false);
   const { comments, userId, postId } = useComments();
   //    const params = useParams();
   //    const [comments, setComments] = useState([]);
   //    const { setRefreshComments } = useContext(PostPageContext)

   //    async function getPostComments() {
   //       const res = await fetch(`/api/posts/${params.postId}/comments`);
   //       console.log('i ran')
   //       if (res.ok) {
   //          const data = await res.json();
   //          return data.comments
   //       } else {
   //          return "Something went wrong.";
   //       }
   //    }

   //    useEffect(() => {

   //       let comments = getPostComments();
   //       setComments(comments)

   //    }, []);

   let leaveComment;
   if (!addComment) {
      leaveComment = (
         <button
            type="button"
            className="comments__add-btn"
            onClick={() => setAddComment(!addComment)}
         >
            Leave a Comment
         </button>
      );
   } else {
      leaveComment = (
         <CommentCreateForm
            setAddComment={setAddComment}
            addComment={addComment}
            postId={postId}
            userId={userId}
         />
      );
   }

   // useEffect(() => {

   // console.log(comments)

   //  });

   return (
      <>
         <div className="comment-create">{leaveComment}</div>
         {comments?.length ? (
            <div className="comment-list">
               {comments?.map((comment, i) => {
                  return (
                     <div key={comment.id}>
                        <div className="comment">
                           <Comment comment={comment} />
                           {comments[i + 1] ? (
                              <div key={i} className="comment__border"></div>
                           ) : null}
                        </div>
                     </div>
                  );
               })}
            </div>
         ) : null}
      </>
   );
}
