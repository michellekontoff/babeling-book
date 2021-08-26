import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function PostCreateForm(){
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [languageId, setLanguageId] = useState(1)
    const [languageList, setLanguageList] = useState([])

    const userId = useSelector(state => state.session.user.id)


}
