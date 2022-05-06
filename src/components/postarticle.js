import React, { useState, useEffect } from 'react'

export default function Post(props) {

    const [inputTitle, setInputTitle] = useState('')
    const TitleChange = (event) => {
        console.log(inputTitle)
        setInputTitle(event.target.value)
    }
    const [inputBody, setInputBody] = useState('')
    const BodyChange = (event) => {
        setInputBody(event.target.value)
    }

    async function post(e) {
        e.preventDefault();

        try {
            let res = await fetch(`http://localhost:3001/cms/article`, {
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
                window.location.reload()      
                  } else setInputBody('Error')
        } catch (err) {
            console.log(err)
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
        </form>
    )
}