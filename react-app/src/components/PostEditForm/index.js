import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'

import './postEditForm.css'

export default function PostEditForm({ ownerId, postId }){
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [languageId, setLanguageId] = useState("1")
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
            console.log(errors)
            return
        }
        console.log('I MADE IT MOM')

        const post = {
            title,
            content,
            language_id: parseInt(languageId),
            user_id: userId
        }

        const res = await fetch(`/api/posts/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })

        const data = await res.json()
        console.log(res)
        if (res.ok) {
            history.push(`/posts/${postId}`)
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
                <select onChange={(e) => setLanguageId(e.target.value)}>
                    {languageList?.map((language) => {
                    return <option key={language.id} value={language.id}>{language.name}</option>
                    })}
                </select>
                <button type='submit'>Edit Post</button>
            </form>
    )
}
