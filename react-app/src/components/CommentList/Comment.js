
import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import CommentEditForm from '../CommentEditForm'
import { useComments } from '../../context/CommentsContext'

export default function Comment({ comment }) {
    // const [comment, setComment] = useState({})
    const [editComment, setEditComment] = useState(false)
    const { userId, postOwnerId, getPostComments } = useComments()
    // const { refreshComments, setRefreshComments } = useContext(PostPageContext)
    
    // async function getEditedComment(id) {
    //     const res = await fetch(`/api/comments/${id}`);

    //     const data = await res.json();

    //     if (res.ok) {
    //         setComment(data)
    //     }
    // }

    async function deleteComment() {
        const res = window.confirm('Are you sure you want to permanently delete this comment?')
        
        if (!res) {
            return
        } else {
            const response = await fetch(`/api/comments/${comment.id}`, {
                method: 'DELETE'
            })
        
            const data = await response.json();

            if (response.ok) {
                getPostComments()
            }
       }
    }

    // useEffect(() => {
    //     getEditedComment(comment.id)
    // }, [comment, comment.id, editComment])

    if (editComment) {
        return <CommentEditForm comment={comment} editComment={editComment} setEditComment={setEditComment} />
    }

    return (
        <> { comment.content ?
            <>
            <div className='comment__details'>
                <Link to={`/users/${comment.owner?.id}`}>{comment.owner?.username}</Link> - {comment.created_at} {comment.created_at !== comment.updated_at ? <span>(edited)</span> : null}
            </div>
            <div className='comment__content'>
                {comment.content}
            </div>
            <div className='comment__btns'>
                { comment.owner?.id === userId ? <button type='submit' className='comment-edit__edit' onClick={() => setEditComment(!editComment)}>Edit</button> : null}
                { comment.owner?.id === userId || postOwnerId === userId ? <button type='button' className='comment-edit__del-cancel' onClick={deleteComment}>Delete</button> : null }
            </div></>
            : null}
        </>
    )
}
