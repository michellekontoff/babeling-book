import React, { useState } from 'react';
import { useComments } from '../../context/CommentsContext';

import './commentCreateForm.css';

export default function CommentCreateForm({ addComment, setAddComment }) {
   const { postId, userId, getPostComments } = useComments();
   const [content, setContent] = useState('');
   const [errors, setErrors] = useState([]);

   async function submitComment(e) {
      e.preventDefault();
      const comment = {
         content,
         post_id: postId,
         user_id: userId,
      };

      const res = await fetch('/api/comments', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(comment),
      });

      const data = await res.json();

      if (res.ok) {
         setAddComment(!addComment);
         getPostComments(postId);
         window.scrollTo({
            behavior: 'smooth',
            top: document.querySelector('.comments-container').scrollHeight,
         });
      } else {
         setErrors(data);
      }
   }

   return (
      <form
         className='comment-create-form comment-form'
         onSubmit={(e) => submitComment(e)}
      >
         <label>Leave a Comment</label>
         <label className='errors'>{errors?.content}</label>
         <textarea
            name='content'
            rows='11'
            value={content}
            onChange={(e) => setContent(e.target.value)}
         ></textarea>

         <div className='comment-form__btns'>
            <button type='submit' className='comments__add-btn'>
               Submit
            </button>
            <button
               type='button'
               className='comment-create__cancel'
               onClick={() => setAddComment(!addComment)}
            >
               Cancel
            </button>
         </div>
      </form>
   );
}
