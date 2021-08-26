import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router'

export default function PostCreateForm(){
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
            console.log(list)
            setLanguageList(list.languages)
            

        } else {
            return 'Something went wrong.'
        }
    }

    async function submitPost(e){
        e.preventDefault()
        const post = {
            title,
            content,
            language_id: parseInt(languageId),
            user_id: userId
        }

        const res = await fetch('/api/posts/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })

        const data = await res.json()
        console.log(res)
        if (res.ok) {
            history.push(`/posts/${data.id}`)
        } else {
            setErrors(data)

        }
    }

    useEffect(() => {
        getLanguages()

    }, [])


    return (
        <form className='post-create-form post-form' onSubmit={(e) => submitPost(e)}>
            <label>Title</label>
            <input
                type='text'
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            
            <label>Content</label>
            {/* { errors?.length > 0 ? <p className='errors'>{errors.content}</p> : <p>hi</p>} */}
            <label className='errors'>{errors?.content}</label>
            <textarea
                name='content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            
            <label>Language</label>
            <select onChange={(e) => setLanguageId(e.target.value)}>
                {languageList?.map((language) => {
                   return <option key={language.id} value={language.id}>{language.name}</option>
                })}
            </select>
            <button type='submit'>Create post</button>
        </form>
    )
}
