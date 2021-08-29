import React, { useState, useEffect } from 'react'
import Comment from './Comment'
import { useParams } from 'react-router'

import './commentList.css'

export default function CommentList({ postOwnerId, addComment, userId}) {
    const params = useParams()
    const [comments, setComments] = useState([])

    async function getPostComments(id){
        const res = await fetch(`/api/posts/${id}/comments`)

        if (res.ok) {
            const data = await res.json()
            setComments(data.comments)
        } else {
            return 'Something went wrong.'
        }
    }

    useEffect(() => {
        getPostComments(params.postId)

    }, [addComment, params.postId])
    
    return (
        <>
            <div className='comment-list'>
                {comments?.map((comment, i) => {
                    return <div key={comment.id} className='comment'>
                        <Comment commentId={comment.id} postOwnerId={postOwnerId} userId={userId} />
                    </div>
                })}
            </div>
        </>
    )
}
