import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/loginForm.css";

export default function PostComment(props) {
  let navigate = useNavigate();

  const [inputUsername, setInputUsername] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [error, setError] = useState(false);

  const usernameChange = (event) => setInputUsername(event.target.value);
  const passwordChange = (event) => setInputPassword(event.target.value);

  async function post(e) {
    e.preventDefault();
    try {
      let res = await fetch(`https://le-bloggo.herokuapp.com/auth/login/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: inputUsername,
          password: inputPassword,
        }),
      });
      if (res.status === 200) {
        const response = await res.json();
        localStorage.setItem("token", response.token);
        navigate("/");
        window.location.reload();
        setError(false);
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const beMyGuest = () => {
    setInputPassword("ffffff");
    setInputUsername("ffffff");
  };

  return (
    <form onSubmit={post} className="auth">
      {error ? <p className={"err"}>Incorrect password or username</p> : ""}
      <label htmlFor="username" className="auth">
        Username
      </label>
      <input
        type="text"
        name="username"
        className="auth"
        minLength={6}
        value={inputUsername}
        onChange={usernameChange}
      ></input>
      <label htmlFor="password" className="auth">
        Password
      </label>
      <input
        type="password"
        name="password"
        className="auth"
        minLength={6}
        value={inputPassword}
        onChange={passwordChange}
      ></input>
      <div id="submitAuth">
        <button type="submit">Login</button>
        <button type="submit" onClick={beMyGuest}>
          Be my guest
        </button>
      </div>
    </form>
  );
}
