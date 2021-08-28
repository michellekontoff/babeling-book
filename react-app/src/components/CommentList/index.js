import React from 'react'
import Comment from './Comment'

import './commentList.css'

export default function CommentList({ comments }) {

    return (
        <>
            <div className='comment-list'>
                {comments?.map((comment, i) => {
                    return <div key={comment.id} className='comment-list__item'>
                        <Comment comment={comment} />
                    </div>
                })}
            </div>
        </>
    )
}
