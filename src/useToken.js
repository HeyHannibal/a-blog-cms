import { useState } from 'react';

export default function useToken() {
    
    const getToken = () => JSON.parse(localStorage.getItem('token'));
    const [token, setToken] = useState(getToken());

    const saveToken = (userToken) => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken)
    }

    const deleteToken  = () => localStorage.clear()

    return {
        setToken: saveToken, 
        deleteToken:deleteToken, 
        token,
    }
}