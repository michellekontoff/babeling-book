import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router';
import PostList from '../PostList';
import { searchUsers, searchPosts } from './utils';
import UserList from '../UserList';
import Pagination from '../Pagination';
import { getCurrentPageItems } from '../Pagination/utils';

import './search.css';

export default function SearchResults() {
   const [users, setUsers] = useState([]);
   const [posts, setPosts] = useState([]);
   const [currentPostsPage, setCurrentPostsPage] = useState(1);
   const [currentUsersPage, setCurrentUsersPage] = useState(1);
   const location = useLocation();
   const postPageSize = 30;
   const userPageSize = 10

   const params = new URLSearchParams(location.search);
   const query = params.get('q');

   useEffect(() => {
      searchUsers(query, setUsers);
      searchPosts(query, setPosts);
      window.scrollTo({ behavior: 'smooth', top: 0 });
   }, [query, currentPostsPage, currentUsersPage]);

   const currentPosts = useMemo(() => {
      return getCurrentPageItems(posts, postPageSize, currentPostsPage);
   }, [currentPostsPage, posts]);

   const currentUsers = useMemo(() => {
      return getCurrentPageItems(users, userPageSize, currentUsersPage);
   }, [currentUsersPage, users]);

   return (
      <div className='search-results content'>
         <div className='results__users'>
            <h2>Users</h2>
            <div className='results__users-list'>
               {users.length ? (
                  <>
                     <UserList users={currentUsers} />
                  </>
               ) : (
                  'No users found.'
               )}
            </div>
         </div>
         <Pagination
            className='pagination-bar'
            currentPage={currentUsersPage}
            totalItems={users?.length}
            pageSize={userPageSize}
            siblings={2}
            onPageChange={(page) => setCurrentUsersPage(page)}
         />
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
            currentPage={currentPostsPage}
            totalItems={posts?.length}
            pageSize={postPageSize}
            siblings={2}
            onPageChange={(page) => setCurrentPostsPage(page)}
         />
      </div>
   );
}
