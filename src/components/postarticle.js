import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../stylesheets/form.css";
export default function Post() {
  const [articleForm, setForm] = useState({
    title: "",
    body: "",
    published: true,
  });
  const [error, setError] = useState(false);

  function formChange(event) {
    setForm((prev) => ({
      ...prev,
      [event.target.name]:
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value,
    }));
  }

  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  });

  async function post(e) {
    e.preventDefault();

    try {
      let res = await fetch(`https://le-bloggo.herokuapp.com/article`, {
        method: "POST",
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(articleForm),
      });
      if (res.status === 200) {
        navigate("/");
      } else if (res.status === 403) {
        localStorage.clear();
        navigate("/login");
      } else {
        setError(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form onSubmit={post} className='post'>
      <label htmlFor="Title">
        Title
        <input
          type="text"
          name="title"
          className="post"

          maxLength={80}
          value={articleForm.title}
          onChange={formChange}
        ></input>
      </label>
      <label htmlFor="body">
        Article
        <textarea
          name="body"
          className="post"

          value={articleForm.body}
          onChange={formChange}
        ></textarea>
      </label>
      <label htmlFor="published" className="checkbox">
        <p>Publish Now</p>
        <input
          name="published"
          type="checkbox"
          className="post"
          checked={articleForm.published}
          onChange={formChange}
        />
      </label>
      <button type="submit">Post </button>
      {error ? <p>An error has occured, please try again</p> : ""}
    </form>
  );
}
