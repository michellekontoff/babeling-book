import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router'

import './postPage.css'

export default function PostPage() {
    const user = useSelector(state => state.session.user)
    const [editMode, setEditMode] = useState(false)
    const [post, setPost] = useState({})

    const params = useParams()
    const history = useHistory()

    async function getPost(){
        console.log(params.postId)
        const res = await fetch(`/api/posts/${params.postId}`)

        if (res.ok) {
            const post = await res.json()
            setPost(post)
        } else {
            return 'Something went wrong.'
        }
    }

    async function deletePost() {
        const res = window.confirm('Are you sure you want to permanently delete this post?')

        if (!res) {
            return
        } else {
            await fetch(`/api/posts/${params.postId}`, {
                method: 'DELETE'
            })
            
            history.push(`/users/${user.id}`)
        }

    }

    useEffect(() => {
        getPost()

    }, [])
    useEffect(() => {
        console.log(post)

    })

    let content;
    if (editMode) {
        content = <p>edit mode!</p>
    } else {
        content = (
            <div className='post'>
                <div className='post__title'>
                    <h2>{post.title}</h2>
                </div>
                <div className='post__details'>
                    {post.owner?.username}, {post.created_at}, { post.language }{ post.updated_at !== post.created_at ? <span>, edited {post.updated_at}</span> : null }
                </div>
                <div className='post__content'>
                    {post.content}
                </div>
                <div className='post__btns'>
                    <button className='post__edit' type='button' onClick={() => setEditMode(!editMode)}>Edit</button>
                    <button className='post__delete' type='button' onClick={deletePost}>Delete</button>
                </div>
            </div>
        )
    }

    return (
        <div className='post-container'>
            { post.error ? <h2>{post.error}</h2> : content}
        </div>
    )
}
