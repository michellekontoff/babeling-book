import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import PostList from '../PostList';
import { searchUsers, searchPosts } from './utils';
import UsersList from '../UsersList';

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
            {users.length ? (
               <>
                  <h1>Users</h1>
                  <UsersList users={users} />
               </>
            ) : (
               'No users found.'
            )}
         </div>
         <div className='results__posts'>
            {posts.length ? (
               <>
                  <h1>Posts</h1>
                  <PostList posts={posts} />
               </>
            ) : (
               'No posts found.'
            )}
         </div>
      </div>
   );
}
