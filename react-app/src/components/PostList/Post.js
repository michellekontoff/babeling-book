import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Post({ post }) {
   const [subString, setSubString] = useState(false);
   const { search } = useLocation();

   const query = new URLSearchParams(search).get('q');

   function highlightQuery(query) {
        // const title = post.title
        const content = post.content
        //content match
       if (query) {
            const queryIndex = content.toLowerCase().indexOf(query.toLowerCase())

            let queryMatch;
            let beforeQuery;
            let afterQuery;
            let matchFound;

            if (content.length < 300 && query.length < 300) {

                queryMatch = content.slice(queryIndex, queryIndex + query.length)
                beforeQuery = content.slice(0, queryIndex)
                afterQuery = content.slice(queryIndex + query.length)

            } else if (content.length > 300 && query.length < 300) {

                queryMatch = content.slice(queryIndex, queryIndex + query.length)

                beforeQuery = queryIndex - 100 > 0
                              ? '... ' +  content.slice(queryIndex - 100, queryIndex)
                              : content.slice(0, queryIndex)

                afterQuery = queryIndex + query.length + 100 < content.length
                            ? content.slice(queryIndex + query.length, (queryIndex + query.length + 100)) + ' ...'
                            : content.slice(queryIndex + query.length)

            } else if (query.length > 300) {
                matchFound = (<span className="query-match">{queryMatch}</span>)

                setSubString(matchFound)
                return
            }

            matchFound = (
                <>
                    {beforeQuery}
                    <span className="query-match">{queryMatch}</span>
                    {afterQuery}
                </>
            )
            
            setSubString(matchFound)
       }

       //title match
   }

   /* 
        check if urlsearchparams exist
        if they do, index search match
        then set substring start before index and end after index
        highlight search term if possible
        need to account for query length - if it's too long then just set the query as substring
   */

   useEffect(() => {
      highlightQuery(query);
      if (post.content.length > 200) {
         setSubString(post.content.substring(0, 200) + " ...");
      }
   }, [post.content, query]);

   useEffect(() => {
       console.log(subString)
       console.log(query)
   })

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
               {!subString ? (
                  <>{post.content}</>
               ) : (
                  <>{subString}</>
               )}
            </div>
         </Link>
      </>
   );
}
