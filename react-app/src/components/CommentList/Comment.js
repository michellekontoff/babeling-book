
import React from 'react'
import { Link } from 'react-router-dom'

export default function Comment({ comment }) {

    return (
        <>
            <div className='comment__details'>
                <Link to={`/users/${comment.owner?.id}`}>{comment.owner?.username}</Link> - {comment.created_at} {comment.created_at !== comment.updated_at ? <span>edited {comment.updated_at}</span> : null}
            </div>
            <div className='comment__content'>
                {comment.content}
            </div>
        </>
    )
}
