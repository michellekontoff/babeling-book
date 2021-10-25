import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PostList from "../PostList";

import "./profile.css";

export default function Profile() {
   const [user, setUser] = useState({});
   const [posts, setPosts] = useState([]);
   const params = useParams();

   async function getPosts(userId) {
      const res = await fetch(`/api/users/${userId}/posts`);

      if (res.ok) {
         const data = await res.json();
         if (data.posts.length) {
            setPosts(data.posts);
         } else {
             setPosts((<p align="center">You don't have any posts yet. Why don't you try <Link to='/posts/new' className='first-post'>writing one</Link>?</p>))
         }
      } else {
         return "Something went wrong.";
      }
   }

   async function getUser(userId) {
      const res = await fetch(`/api/users/${userId}`);

      if (res.ok) {
         const data = await res.json();
         setUser(data);
      } else {
         return "Something went wrong.";
      }
   }

   useEffect(() => {
      const userId = params.userId;
      getUser(userId);
      getPosts(userId);
   }, [params.userId]);

   return (
      <>
         <div className="posts-latest content">
            <h1>{user.username}'s Posts</h1>
            {posts.length > 0 ? <PostList posts={posts} /> : <>{posts}</> }
         </div>
      </>
   );
}
