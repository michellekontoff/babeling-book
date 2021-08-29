import React, { useState } from 'react'

import './commentCreateForm.css'

export default function CommentCreateForm({addComment, setAddComment, postId, userId }){

    const [content, setContent] = useState('')
    const [errors, setErrors] = useState([])

    async function submitComment(e){
        e.preventDefault()

        const comment = {
            content,
            post_id: postId,
            user_id: userId
        }

        const res = await fetch('/api/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(comment)
        })

        const data = await res.json()
        
        if (res.ok) {
            setAddComment(!addComment)
        } else {
            setErrors(data)
        }
    }

    return (
            <form className='comment-create-form comment-form' onSubmit={(e) => submitComment(e)}>                
                <label className='errors'>{errors?.content}</label>
                <textarea
                    name='content'
                    rows='10'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>

                <button type='submit'>Leave a Comment</button>
                <button type='button' onClick={() => setAddComment(!addComment)}>Cancel</button>
            </form>
    )
}
