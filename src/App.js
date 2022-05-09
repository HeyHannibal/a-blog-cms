import './stylesheets/App.css';
import { Outlet, Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';

function App() {
  
  return (
    <div className="App">
      <h1>a-blog</h1>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='login'>Logout</Link>
        <Link to='article' >Create New Article</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
