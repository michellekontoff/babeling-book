import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import './commentEditForm.css'

export default function CommentEditForm({ editComment, setEditComment, comment }){

    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])

    async function submitComment(e){
        e.preventDefault()

        const comment = {
            content,
        }

        const res = await fetch(`/api/comments/${comment.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })

        const data = await res.json()
        
        if (res.ok) {
            setEditComment(!editComment)
        } else {
            setErrors(data)
        }
    }

    return (
            <form className='comment-edit-form comment-form' onSubmit={(e) => submitComment(e)}>                
                <label className='errors'>{errors?.content}</label>
                <textarea
                    name='content'
                    rows='10'
                    value={comment.content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                <div className='comment__btns'>
                    <button type='submit' className='comment-edit__edit'>Edit</button>
                    <button type='button' className='comment-edit__del-cancel' onClick={() => setEditComment(!editComment)}>Cancel</button>
                </div>
            </form>
    )
}
