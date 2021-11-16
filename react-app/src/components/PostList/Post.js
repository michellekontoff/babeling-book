import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { highlightQuery } from "../Search/utils";

export default function Post({ post }) {
   const [subString, setSubString] = useState(false);
   const [title, setTitle] = useState(post.title)
   const { search } = useLocation();

   const query = new URLSearchParams(search).get('q');

   useEffect(() => {
       if (query) {
           highlightQuery(query, post, setSubString, setTitle);
           return;
       } else if (!query && post.content.length > 200) {
         setSubString(post.content.substring(0, 200) + " ...");
      }
   }, [post, post.content, query]);

   return (
      <div className="post">
         <Link to={`/posts/${post.id}`}>
            <div className="post__title">
            {post?.title && <h2>{query ? title : post.title}</h2>}
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
               {!subString ? (
                  <>{post.content}</>
               ) : (
                  <>{subString}</>
               )}
            </div>
         </Link>
      </div>
   );
}
