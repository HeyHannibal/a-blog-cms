import React, { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";

export default function PostComment(props) {

    

    const [inputUsername, setInputUsername] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    const usernameChange = (event) =>  setInputUsername(event.target.value)
    const passwordChange = (event) => setInputPassword(event.target.value)

    let navigate = useNavigate()
    useEffect(() => {
        if(window.localStorage.getItem('token')) {
            return navigate('/cms')
        }
    })
    

    async function post(e) {
        e.preventDefault();
        try {
            let res = await fetch(`http://localhost:3001/cms/login/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: inputUsername,
                    password: inputPassword,
                }),
            })
            if (res.status === 200) {
                console.log('200')
                const response = await res.json()
                localStorage.setItem('token', response.token)
                navigate('/cms')
            } else setInputPassword('Error')
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
            <label htmlFor='password'>
                Password
                <input type='password' name='password' value={inputPassword} onChange={passwordChange}></input>
            </label>
            <button type='submit'>Post Comment</button>
        </form>
    )
}