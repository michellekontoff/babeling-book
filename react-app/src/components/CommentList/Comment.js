
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import CommentEditForm from '../CommentEditForm'

export default function Comment({ commentId }) {
    const [editComment, setEditComment] = useState(false)
    const [comment, setComment] = useState({})
    
    async function getEditedComment(id) {
        const res = await fetch(`/api/comments/${id}`);

        const data = await res.json();

        if (res.ok) {
            setComment(data)
        }
    }

    async function deleteComment() {
        const res = window.confirm('Are you sure you want to permanently delete this comment?')

        if (!res) {
            return
        } else {
            await fetch(`/api/comments/${comment.id}`, {
                method: 'DELETE'
            })
        }
    }

    useEffect(() => {
        getEditedComment(commentId)
    }, [editComment, comment.id])

    if (editComment) {
        return <CommentEditForm comment={comment} editComment={editComment} setEditComment={setEditComment} />
    }

    return (
        <>
            <div className='comment__details'>
                <Link to={`/users/${comment.owner?.id}`}>{comment.owner?.username}</Link> - {comment.created_at} {comment.created_at !== comment.updated_at ? <span>edited {comment.updated_at}</span> : null}
            </div>
            <div className='comment__content'>
                {comment.content}
            </div>
            <div className='comment__btns'>
                <button type='submit' className='comment-edit__edit' onClick={() => setEditComment(!editComment)}>Edit</button>
                <button type='button' className='comment-edit__del-cancel' onClick={deleteComment}>Delete</button>
            </div>
        </>
    )
}
