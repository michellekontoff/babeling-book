import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Post from './Post'

import './postList.css'

export default function PostList({ posts }) {

    return (
        <>
            <div className='post-list'>
                {posts?.map((post, i) => {
                    return <div key={post.id} className='post-list__item'>
                        <Link to={`/posts/${post.id}`}><Post post={post}></Post></Link>
                    </div>
                })}
            </div>
        </>
    )
}
