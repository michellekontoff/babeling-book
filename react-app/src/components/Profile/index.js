import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
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
         setPosts(data.posts);
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
         <div className="posts-latest">
            <h1>{user.username}'s Posts</h1>
            <PostList posts={posts} />
         </div>
      </>
   );
}
