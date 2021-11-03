import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PostList from "../PostList";

import "./profile.css";

export default function Profile() {
   const currentUser = useSelector((state) => state.session.user)
   const [user, setUser] = useState({});
   const [posts, setPosts] = useState([]);
   const [profileId, setProfileId] = useState(null)
   const params = useParams();

   async function getPosts(userId) {
      const res = await fetch(`/api/users/${userId}/posts`);
      if (res.ok) {
         const data = await res.json();
         if (data.posts.length) {
            setPosts(data.posts);
         } else {
             if (currentUser.id === profileId) {
                 setPosts((<p align="center">You don't have any posts yet. Why don't you try <Link to='/posts/new' className='first-post'>writing one</Link>?</p>))
             } else {
                 setPosts((<p align="center">This user hasn't made any posts yet.</p>))
             }
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
      setProfileId(parseInt(params.userId))
      getUser(params.userId);
      getPosts(params.userId);
   }, [params.userId]);

   return (
      <>
         <div className="posts-latest content">
            <h1>{user.username && `${user.username}'s Posts`}</h1>
            {posts.length > 0 ? <PostList posts={posts} /> : <>{posts}</> }
         </div>
      </>
   );
}
