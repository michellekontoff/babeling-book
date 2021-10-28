import React from "react";
import Post from "./Post";

import "./postList.css";

export default function PostList({ posts }) {
   return (
      <div className="post-list content">
         {posts?.map((post, i) => {
            return (
               <div key={post.id} className="post-list__item">
                  <Post post={post} />
               </div>
            );
         })}
      </div>
   );
}
