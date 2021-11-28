import React, { useState } from "react";
import { useComments } from "../../context/CommentsContext";

import "./commentEditForm.css";

export default function CommentEditForm({
   editComment,
   setEditComment,
   comment,
}) {
   const { getPostComments, postId } = useComments();
   const [content, setContent] = useState(comment.content);
   const [errors, setErrors] = useState([]);

   async function submitComment(e) {
      e.preventDefault();

      const editedComment = {
         content,
      };

      const res = await fetch(`/api/comments/${comment.id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(editedComment),
      });

      const data = await res.json();

      if (res.ok) {
         setEditComment(!editComment);
         getPostComments(postId);
      } else {
         setErrors(data);
      }
   }

   return (
      <>
         <form className="comment-edit-form comment-form">
            <label className="errors">{errors?.content}</label>
            <textarea
               name="content"
               rows="6"
               value={content}
               onChange={(e) => setContent(e.target.value)}
            ></textarea>
         </form>
         <div className="comment__btns">
            <i
               className="comment-edit__edit fas fa-edit"
               onClick={(e) => submitComment(e)}
            >
            </i>
            <i
               className="comment-edit__del-cancel fas fa-ban"
               onClick={() => setEditComment(!editComment)}
            >
            </i>
         </div>
      </>
   );
}
