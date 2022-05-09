import React, { useState, useEffect } from 'react'

export default function DeleteComment(props) {
    
    const [inputCommentBody, setInputCommentBody] = useState('')
    const [inputUsername, setInputUsername] = useState('')
    const usernameChange = (event) => setInputUsername(event.target.value)
    const commentBodyChange = (event) => setInputCommentBody(event.target.value)


    async function deleteComment(e) {
        e.preventDefault();

        try {
            let res = await fetch(`http://localhost:3001/article/${props.articleId}/comment/`, {
                method: 'delete',
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
            } else {
                window.location.reload()
            }
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <form onSubmit={deleteComment}>
            <label htmlFor='username'>
                Username
                <input type='text' name='username' value={inputUsername} onChange={usernameChange}></input>
            </label>
            <label htmlFor='body'>
                Comment
                <textarea name='body' value={inputCommentBody} onChange={commentBodyChange}></textarea>
            </label>
            <button type='submit'>delete Comment</button>
        </form>
    )
}