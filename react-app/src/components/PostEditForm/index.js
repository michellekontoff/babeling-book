import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getLanguages } from "../postUtils";

import "./postEditForm.css";

export default function PostEditForm({ ownerId, post, editMode, setEditMode }) {
   const [title, setTitle] = useState(post.title);
   const [content, setContent] = useState(post.content);
   const [languageId, setLanguageId] = useState(post.language.id);
   const [languageList, setLanguageList] = useState([]);
   const [errors, setErrors] = useState([]);

   const userId = useSelector((state) => state.session.user.id);

   async function editPost(e) {
      e.preventDefault();

      if (ownerId !== userId) {
         setErrors({
            auth: "You are not authorized to edit this post.",
         });
         return;
      }

      const editedPost = {
         title,
         content,
         language_id: parseInt(languageId),
         user_id: userId,
      };

      const res = await fetch(`/api/posts/${post.id}`, {
         method: "PUT",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(editedPost),
      });

      const data = await res.json();

      if (res.ok) {
         setEditMode(!editMode);
      } else {
         setErrors(data);
      }
   }

   useEffect(() => {
      getLanguages(setLanguageList);
   }, []);

   return (
      <form className="post-edit-form post-form" onSubmit={(e) => editPost(e)}>
         <label className="errors">{errors?.auth}</label>
         <label>Title</label>
         <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
         />

         <label>Content</label>
         {errors?.content && <label className="errors">{errors?.content}</label>}
         <textarea
            name="content"
            rows="22"
            value={content}
            onChange={(e) => setContent(e.target.value)}
         ></textarea>

         <label className="language-label">Language</label>
         <select
            value={languageId}
            onChange={(e) => setLanguageId(e.target.value)}
         >
            {languageList?.map((language) => {
               return (
                  <option key={language.id} value={language.id}>
                     {language.name}
                  </option>
               );
            })}
         </select>
         <div className="post-edit__btns">
            <button type="submit" className="post-edit__edit">
               Edit Post
            </button>
            <button
               type="button"
               className="post-edit__cancel"
               onClick={() => setEditMode(!editMode)}
            >
               Cancel
            </button>
         </div>
      </form>
   );
}
