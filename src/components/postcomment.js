import React, { useState, useEffect } from 'react'

export default function PostComment(props) {

    const [inputUsername, setInputUsername] = useState('')
    const usernameChange = (event) => {
        console.log(inputUsername)
        setInputUsername(event.target.value)
    }
    const [inputCommentBody, setInputCommentBody] = useState('')
    const commentBodyChange = (event) => {
        console.log(inputUsername)
        setInputCommentBody(event.target.value)
    }

    async function post(e) {
        e.preventDefault();

        try {
            let res = await fetch(`http://localhost:3001/article/${props.articleId}/comment/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: inputUsername,
                    body: inputCommentBody,
                }),
            })
            if (res.status === 200) {
                window.location.reload()      
                  } else setInputCommentBody('Error')
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <form onSubmit={post}>
            <label htmlFor='username'>
                Username
                <input type='text' name='username' value={inputUsername} onChange={usernameChange}></input>
            </label>
            <label htmlFor='body'>
                Comment
                <textarea name='body' value={inputCommentBody} onChange={commentBodyChange}></textarea>
            </label>
            <button type='submit'>Post Comment</button>
        </form>
    )
}