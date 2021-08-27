import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'

import './postEditForm.css'

export default function PostEditForm({ ownerId, post, editMode, setEditMode }){
    const history = useHistory()
    const [title, setTitle] = useState(post.title)
    const [content, setContent] = useState(post.content)
    const [languageId, setLanguageId] = useState(post.language.id)
    const [languageList, setLanguageList] = useState([])
    const [errors, setErrors] = useState([])

    const userId = useSelector(state => state.session.user.id)

    async function getLanguages() {
        const res = await fetch('/api/languages/')

        if (res.ok) {
            const list = await res.json()
            setLanguageList(list.languages)

        } else {
            return 'Something went wrong.'
        }
    }

    async function editPost(e){
        e.preventDefault()

        if (ownerId != userId) {
            setErrors({
                auth: 'You are not authorized to edit this post.'
            })
            return
        }

        const editedPost = {
            title,
            content,
            language_id: parseInt(languageId),
            user_id: userId
        }
        console.log(editedPost)
        const res = await fetch(`/api/posts/${post.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedPost)
        })

        const data = await res.json()
        console.log(res)
        if (res.ok) {
            setEditMode(false)
            // history.push(`/posts/${post.id}`)
        } else {
            setErrors(data)

        }
    }

    useEffect(() => {
        getLanguages()

    }, [])


    return (
            <form className='post-edit-form post-form' onSubmit={(e) => editPost(e)}>
               <label className='errors'>{errors?.auth}</label>
                <label>Title</label>
                <input
                    type='text'
                    name='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                <label>Content</label>
                <label className='errors'>{errors?.content}</label>
                <textarea
                    name='content'
                    rows='22'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
                
                <label className='language-label'>Language</label>
                <select value={post.language.id === languageId ? languageId : null} onChange={(e) => setLanguageId(e.target.value)}>
                    {languageList?.map((language) => {
                    return <option key={language.id} value={language.id}>{language.name}</option>
                    })}
                </select>
                <button type='submit'>Edit Post</button>
            </form>
    )
}
