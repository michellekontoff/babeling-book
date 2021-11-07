import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Post({ post }) {
   const [subString, setSubString] = useState(false);

   /* 
        check if urlsearchparams exist
        if they do, index search match
        then set substring start before index and end after index
        highlight search term if possible
        need to account for query length - if it's too long then just set the query as substring
   */

   useEffect(() => {
      if (post.content.length > 200) {
         setSubString(post.content.substring(0, 200) + " ...");
      }
   }, [post.content]);

   return (
      <>
         <Link to={`/posts/${post.id}`}>
            <div className="post__title">
            {post?.title && <h2>{post.title}</h2>}
            </div>
         </Link>
         <div className="post__details">
            <Link 
            className="post__owner"
            to={`/users/${post.owner?.id}`}
            >{post.owner?.username}</Link> : {post.language?.name} - {post.created_at}
         </div>
         <Link to={`/posts/${post.id}`}>
            <div className="post__content">
               {post.content?.length < 200 ? (
                  <>{post.content}</>
               ) : (
                  <>{subString}</>
               )}
            </div>
         </Link>
      </>
   );
}
