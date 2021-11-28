import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PostList from '../PostList';

import './profile.css';

export default function Profile() {
   const currentUser = useSelector((state) => state.session.user);
   const [user, setUser] = useState({});
   const [posts, setPosts] = useState([]);
   const params = useParams();

   async function getUser(userId) {
      const res = await fetch(`/api/users/${userId}`);

      if (res.ok) {
         const data = await res.json();
         setUser(data);
      } else {
         return 'No such user exists.';
      }
   }

   async function getPosts(userId) {
      if (userId) {
         const res = await fetch(`/api/users/${userId}/posts`);
         if (res.ok) {
            const data = await res.json();
               setPosts(data.posts);
         } else {
            return 'Something went wrong fetching posts.';
         }
      }
   }

   function noPosts() {
      if (currentUser.id === user.id) {
         return (
            <p className='not-found' align='center'>
               You don't have any posts yet. Why don't you try{' '}
               <Link to='/posts/new' className='first-post'>
                  writing one
               </Link>
               ?
            </p>
         );
      } else {
         return (
            <p className='not-found' align='center'>
               This user hasn't made any posts yet.
            </p>
         );
      }
   }

   useEffect(() => {
      const userId = params.userId;
      getUser(userId);
   }, [params.userId]);

   useEffect(() => {
      getPosts(user.id);
   }, [user]);

   return (
      <>
         {user.username ? (
            <div className='posts-latest content'>
               <h1>{`${user.username}'s Posts`}</h1>
               {posts.length > 0 ? <PostList posts={posts} /> : <>{noPosts()}</>}
            </div>
         ) : (
            <div className='posts-latest content'>
               <p className='not-found' align='center'>
                  No such user exists.
               </p>
            </div>
         )}
      </>
   );
}
