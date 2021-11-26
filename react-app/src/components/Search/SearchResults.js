import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import PostList from '../PostList';
import { searchUsers, searchPosts } from './utils';
import UserList from '../UserList';

import './search.css'

/*
    PAGINATION:
    Things we need to track:
        ++ current page
            tells us the needed offset for search query
        ++ whether there are more results after current 20 found (nextpage state/variable?)
             tells us if we need link to next pages?
                this method will be faster, tho less convenient to user?
             alternatively... predetermine number of pages by dividing num results by limit?
                larger query required, potentially problematic if many results are returned
                could circumvent issue by doing 5-10 pages' worth of query at a time.

    ++ searchPosts fx (in utils)
        also takes in page num

        will need setPosts and setNextPages
    
    ++ search route
        if page num is not NoneType/blank, then multiply it by limit (30) to determine offset

        perform query with appropriate offset (these are da posts)

        if page num % 5 === 1, perform query to find out how many results there are for next 5 pages worth of content. ceiling of divided len of results by 30

        create list of range(currentPage, numPages + 1)

        return posts and page nums

    ++ search results component
        maybe in postUtils, add a nextPageLink fx
            creates navLinks for the next ~5 pages from the page nums returned in the search route
        
        

*/

export default function SearchResults() {
   const [users, setUsers] = useState({});
   const [posts, setPosts] = useState({});
   const location = useLocation();

   const params = new URLSearchParams(location.search);
   const query = params.get('q');
   const currentPage = params.get('page')

   useEffect(() => {
      searchUsers(query, setUsers);
      searchPosts(query, setPosts, currentPage);
   }, [query, currentPage]);

   return (
      <div className='search-results content'>
         <div className='results__users'>
             <h2>Users</h2>
             <div className='results__users-list'>
            {users.length ? (
               <>
                  <UserList users={users} />
               </>
            ) : (
               'No users found.'
            )}
            </div>
         </div>
         <div className='results__posts'>
            <h2>Posts</h2>
            {posts.length ? (
               <>
                  <PostList posts={posts} />
               </>
            ) : (
               <div className="results__no-posts">No posts found.</div>
            )}
         </div>
      </div>
   );
}
