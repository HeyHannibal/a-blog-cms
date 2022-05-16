import "./stylesheets/App.css";
import { Outlet, Link, useNavigate } from "react-router-dom";
import React from "react";

function App() {
  let navigate = useNavigate();

  function signOut() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="App">
      <h1>The Blog</h1>
      <nav>
        <Link to="/">Home</Link>
        {localStorage.getItem("token") ? (
          <a onClick={signOut}>Sign out</a>
        ) : (
          <Link to="login">Login</Link>
        )}
        <Link to="article">Create New Article</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
