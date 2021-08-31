import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { getLanguages } from '../postUtils'

import image from '../../images/postCreate.jpg'

import './postCreateForm.css'

export default function PostCreateForm(){
    const history = useHistory()

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [languageId, setLanguageId] = useState("1")
    const [languageList, setLanguageList] = useState([])
    const [errors, setErrors] = useState([])

    const userId = useSelector(state => state.session.user.id)

    async function submitPost(e){
        e.preventDefault()
        const post = {
            title,
            content,
            language_id: parseInt(languageId),
            user_id: userId
        }

        const res = await fetch('/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })

        const data = await res.json()
        
        if (res.ok) {
            history.push(`/posts/${data.id}`)
        } else {
            setErrors(data)

        }
    }

    useEffect(() => {
        getLanguages(setLanguageList)

    }, [])


    return (
        <div className='post-create-container'>
            <img id='post-create-img' src={image} alt='create-post-img'></img>
            <form className='post-create-form post-form' onSubmit={(e) => submitPost(e)}>
                {/* <h2>Create Post</h2> */}
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
                <button type='submit'>Create New Post</button>
            </form>
        </div>
    )
}
