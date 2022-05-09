import './stylesheets/App.css';
import { Outlet, Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import useToken from './useToken';

function App() {

  const { token, deleteToken } = useToken();

  let navigate = useNavigate()

  function signOut() {
    deleteToken();
    navigate('/')
  }

  return (
    <div className="App">
      <h1>a-blog</h1>
      <nav>
        <Link to='/'>Home</Link>
        {token ?
          <a onClick={signOut}>Sign out</a>
          :
          <Link to='login'>Login</Link>
        }
        <Link to='article' >Create New Article</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
