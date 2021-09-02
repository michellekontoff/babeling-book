import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import PostList from '../PostList';

export default function SearchResults() {
    const [users, setUsers] = useState({})
    const [posts, setPosts] = useState({})
    const params = useParams()

    async function getResults(search) {
        if (search.length < 40) {
            const res = await fetch(`/api/users/search/${search}`)
            console.log(res)
            if (res.ok) {
                const data = await res.json()
                console.log(data)
                setUsers(data.users)
            }
        }

        const res = await fetch(`/api/posts/search/${search}`)

        if (res.ok) {
            const data = await res.json()
            console.log(data)
            setPosts(data.posts)
        }
        return
    }

    useEffect(() => {
        getResults(params.search)
    }, [params.search])

    return (
        <div className='search-results'>
            {/* <div className='search_users'>
                <h1>Users</h1>
            </div> */}
            {posts.length && <div className="search__posts posts-list-container">
                <h1>Posts</h1>
                <PostList posts={posts} />
            </div>}
        </div>
     );
}
