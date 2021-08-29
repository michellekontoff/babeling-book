import React from 'react'
import Comment from './Comment'

import './commentList.css'

export default function CommentList({ comments, editComment, setEditComment }) {
    
    return (
        <>
            <div className='comment-list'>
                {comments?.map((comment, i) => {
                    return <div key={comment.id} className='comment'>
                        <Comment comment={comment} editComment={editComment} setEditComment={setEditComment} />
                    </div>
                })}
            </div>
        </>
    )
}
