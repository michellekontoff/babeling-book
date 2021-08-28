import React, { useEffect, useState } from 'react'

export default function PostList({ post }) {
    // useEffects
    return (
        <>
            <div className='post-list'>
                {post.content}
            </div>
        </>
    )
}
