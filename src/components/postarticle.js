import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function Post() {

    const [inputTitle, setInputTitle] = useState('');
    const [inputBody, setInputBody] = useState('');
    const [error, setError] = useState('');
    const TitleChange = (event) => setInputTitle(event.target.value)
    const BodyChange = (event) => setInputBody(event.target.value)

    
    let navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
    })


    async function post(e) {
        e.preventDefault();

        try {
            let res = await fetch(`http://localhost:3001/article`, {
                method: 'POST',
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: inputTitle,
                    body: inputBody,
                }),
            })
            if (res.status === 200) {
                navigate('/')
            }
            else if (res.status === 403) {
                localStorage.clear()
                navigate('/login')
            } else {
                setError(true)
            }

        } catch (err) {
            console.log('aaa');
        }
    }


    return (
        <form onSubmit={post}>
            <label htmlFor='Title'>
                Title
                <input type='text' name='Title' value={inputTitle} onChange={TitleChange}></input>
            </label>
            <label htmlFor='body'>

                <textarea name='body' value={inputBody} onChange={BodyChange}></textarea>
            </label>
            <label>
                <input type='checkbox' />
            </label>
            <button type='submit'>Post </button>
            {error ? <p>error</p> : ''}
        </form>
    )
}