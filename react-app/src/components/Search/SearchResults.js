import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router';
import PostList from '../PostList';
import { searchUsers, searchPosts } from './utils';
import UsersList from '../UsersList';

export default function SearchResults() {
    const [users, setUsers] = useState({})
    const [posts, setPosts] = useState({})
    const { search } = useLocation();
  
    const query = new URLSearchParams(search).get('q')



    useEffect(() => {
        searchUsers(query, setUsers);
        searchPosts(query, setPosts);
    }, [query])

    return (
        <div className='search-results'>
            {users.length ? <div className='search_users'>
                <h1>Users</h1>
                <UsersList users={users} />
            </div> : null}
            {posts.length ? <div className="search__posts posts-list-container">
                <h1>Posts</h1>
                <PostList posts={posts} />
            </div> : null}
        </div>
     );
}
