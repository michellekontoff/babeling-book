import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useHistory } from 'react-router'
import { Link } from 'react-router-dom'

import PostEditForm from '../PostEditForm'
import CommentCreateForm from '../CommentCreateForm'
import CommentList from '../CommentList'

import './postPage.css'

export default function PostPage() {
    const user = useSelector(state => state.session.user)
    const [editComment, setEditComment] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [addComment, setAddComment] = useState(false)
    const [post, setPost] = useState({})
    // const [comments, setComments] = useState([])

    const params = useParams()
    const history = useHistory()

    async function getPost(id){
        const res = await fetch(`/api/posts/${id}`)

        if (res.ok) {
            const post = await res.json()
            setPost(post)
        } else {
            return 'Something went wrong.'
        }
    }

    // async function getPostComments(id){
    //     const res = await fetch(`/api/posts/${id}/comments`)

    //     if (res.ok) {
    //         const data = await res.json()
    //         setComments(data.comments)
    //     } else {
    //         return 'Something went wrong.'
    //     }
    // }

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
        getPost(params.postId)
        // getPostComments(params.postId)

    }, [editMode, params.postId])

    // useEffect(() => {
    //     getPostComments(params.postId)

    // }, [addComment, editComment, params.postId])


    let content;
    if (editMode) {
        content = <PostEditForm editMode={editMode} setEditMode={setEditMode} ownerId={post.owner?.id} post={post} />
    } else {
        content = (
                <div className='post'>
                    <div className='post__title'>
                        <h2>{post.title}</h2>
                    </div>
                    <div className='post__details'>
                        <div><Link to={`/users/${post.owner?.id}`}>{post.owner?.username}</Link></div>
                        <div>{ post.language?.name }</div>
                        <div>{post.created_at}</div>
                        { post.updated_at !== post.created_at ? <div>edited {post.updated_at}</div> : null }
                    </div>
                    <div className='post__content'>
                        {post.content}
                    </div>
                    { post.owner?.id === user.id ?
                        <div className='post__btns'>
                            <button className='post__edit' type='button' onClick={() => setEditMode(!editMode)}>Edit</button>
                            <button className='post__delete' type='button' onClick={deletePost}>Delete</button>
                        </div>
                        : null}
                </div>
        )
    }

    let leaveComment;
    if (!addComment) {
        leaveComment = <button type='button' className='comments__add-btn' onClick={() => setAddComment(!addComment)}>Leave a Comment</button>
    } else {
        leaveComment = <CommentCreateForm setAddComment={setAddComment} addComment={addComment} postId={post.id} userId={user.id} />
    }

    return (
        <div className='post-page'>
            <div className='post-container'>
                { post.error ? <h2>{post.error}</h2> : content}
            </div>
            <div className='comment-create-container'>
                {leaveComment}
            </div>
            <div className='comments-container'>
                <CommentList />
            </div>
        </div>
    )
}
