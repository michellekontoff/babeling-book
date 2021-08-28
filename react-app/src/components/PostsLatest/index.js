import React, { useEffect, useState } from 'react'
import PostList from '../PostList'

import './postsLatest.css'

export default function PostLatest() {
    const [posts, setPosts] = useState([])

    async function getPosts(){
        const res = await fetch(`/api/posts/latest`)

        if (res.ok) {
            const data = await res.json()
            // console.log(data)
            setPosts(data.posts)
        } else {
            return 'Something went wrong.'
        }
    }

    useEffect(() => {
        getPosts()

    }, [])

    return (
        <>
            <div className='posts-latest'>
                <h2>Latest Posts</h2>
                <PostList posts={posts} />
            </div>
        </>
    )
}
