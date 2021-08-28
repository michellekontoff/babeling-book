import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function PostList({ post }) {
    // useEffects
    return (
        <>
            <Link to={`/posts/${post.id}`}><div className='post__title'>
                <h2>{post.title}</h2>
            </div></Link>
            <div className='post__details'>
                <Link to={`/users/${post.owner?.id}`}>{post.owner?.username}</Link> : { post.language?.name } - {post.created_at}
            </div>
            <Link to={`/posts/${post.id}`}><div className='post__content'>
                {post.content}
            </div></Link>
        </>
    )
}
