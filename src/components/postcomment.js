import React, { useState, useEffect } from 'react'

export default function DeleteComment(props) {
    
    const [inputCommentBody, setInputCommentBody] = useState('')
    const [inputUsername, setInputUsername] = useState('')
    const usernameChange = (event) => setInputUsername(event.target.value)
    const commentBodyChange = (event) => setInputCommentBody(event.target.value)


    


    return (
        <form >
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