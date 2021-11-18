import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import PostList from '../PostList';
import { searchUsers, searchPosts } from './utils';
import UserList from '../UserList';

import './search.css'

export default function SearchResults() {
   const [users, setUsers] = useState({});
   const [posts, setPosts] = useState({});
   const { search } = useLocation();

   const query = new URLSearchParams(search).get('q');

   useEffect(() => {
      searchUsers(query, setUsers);
      searchPosts(query, setPosts);
   }, [query]);

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
               'No posts found.'
            )}
         </div>
      </div>
   );
}
