import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router';
import { Link } from 'react-router-dom';

import PostEditForm from '../PostEditForm';
import CommentList from '../CommentList';

import { CommentsProvider } from '../../context/CommentsContext';

import './postPage.css';

export default function PostPage() {
   const user = useSelector((state) => state.session.user);
   const [editMode, setEditMode] = useState(false);
   const [post, setPost] = useState({});

   const params = useParams();
   const history = useHistory();

   function editPost() {
    setEditMode(!editMode)
    window.scrollTo({behavior: 'smooth', top: '0px'})
   }

   async function getPost(id) {
      const res = await fetch(`/api/posts/${id}`);

      if (res.ok) {
         const post = await res.json();
         setPost(post);
      } else {
         return 'Something went wrong.';
      }
   }

   async function deletePost() {
      const res = window.confirm(
         'Are you sure you want to permanently delete this post?'
      );

      if (!res) {
         return;
      } else {
         await fetch(`/api/posts/${params.postId}`, {
            method: 'DELETE',
         });

         history.push(`/users/${user.id}`);
      }
   }

   useEffect(() => {
      getPost(params.postId);
   }, [editMode, params.postId, history]);

   let content;
   if (editMode) {
      content = (
         <PostEditForm
            editPostMode={editPost}
            ownerId={post.owner?.id}
            post={post}
         />
      );
   } else {
      content = (
         <div className='post'>
            <div className='post__title'>
               {post?.title && <h2>{post.title}</h2>}
            </div>
            <div className='post__details'>
               <div>
                  <Link className="post__owner" to={`/users/${post.owner?.id}`}>
                     {post.owner?.username}
                  </Link>
               </div>
               <div>{post.language?.name}</div>
               <div>{post.created_at}</div>
               {post.updated_at !== post.created_at ? (
                  <div>edited {post.updated_at}</div>
               ) : null}
            </div>
            <div className='post__content'>{post.content}</div>
            {post.owner?.id === user.id ? (
               <div className='post__btns'>
                  <i
                     className='post__edit fas fa-edit'
                     onClick={editPost}
                  >
                  </i>
                  <i
                     className='post__delete fas fa-trash-alt'
                     onClick={deletePost}
                  >
                  </i>
               </div>
            ) : null}
         </div>
      );
   }

   return (
      <>
         {post.error ? (
            <div className='post-page content'>
                <p className='not-found' align='center'>
                    The post you requested could not be found.
                </p>
            </div>
         ) : (
            <div className='post-page content'>
               <div className='post-container'>{content}</div>
               <div className='comments-container'>
                  {post.content ? (
                     <CommentsProvider
                        postOwnerId={post.owner?.id}
                        userId={user.id}
                        postId={post.id}
                     >
                        <CommentList />
                     </CommentsProvider>
                  ) : null}
               </div>
            </div>
         )}
      </>
   );
}
