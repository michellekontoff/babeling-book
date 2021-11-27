import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router';
import PostList from '../PostList';
import { searchUsers, searchPosts } from './utils';
import UserList from '../UserList';
import Pagination from '../Pagination';

import './search.css';

export default function SearchResults() {
   const [users, setUsers] = useState({});
   const [posts, setPosts] = useState([]);
   const [currentPage, setCurrentPage] = useState(1);
   const location = useLocation();

   const params = new URLSearchParams(location.search);
   const query = params.get('q');

   useEffect(() => {
      searchUsers(query, setUsers);
      searchPosts(query, setPosts);
      window.scrollTo({behavior: 'smooth', top: 0})
   }, [query, currentPage]);

   const currentPosts = useMemo(() => {
      let pageSize = 30;
      const firstPageIdx = (currentPage - 1) * pageSize;
      const lastPageIdx = firstPageIdx + pageSize;
      if (posts.length) {
         return posts.slice(firstPageIdx, lastPageIdx);
      }
   }, [currentPage, posts]);

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
                  <PostList posts={currentPosts} />
               </>
            ) : (
               <div className='results__no-posts'>No posts found.</div>
            )}
         </div>
         <Pagination
            className='pagination-bar'
            currentPage={currentPage}
            totalItems={posts?.length}
            pageSize={30}
            onPageChange={(page) => setCurrentPage(page)}
         />
      </div>
   );
}
