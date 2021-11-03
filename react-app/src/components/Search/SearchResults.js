import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import PostList from '../PostList';
import { searchUsers, searchPosts } from './utils';
import UsersList from '../UsersList';

export default function SearchResults() {
    const [users, setUsers] = useState({})
    const [posts, setPosts] = useState({})
    const params = useParams()

    useEffect(() => {
        searchUsers(params.search, setUsers)
        searchPosts(params.search, setPosts)
    }, [params.search])

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
