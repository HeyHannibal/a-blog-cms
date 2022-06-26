import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import uniqid from "uniqid";

import ActionWindow from "./actionWindow";
import "../stylesheets/articleList.css";

export default function Homepage(props) {
  const [articles, setArticles] = useState(false);
  const [actionWindow, setActionWindow] = useState({
    action: "",
    isOpen: false,
    id: "",
  });
  const [error, setError] = useState(false)


  let navigate = useNavigate("/");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    if (!articles) {
      fetch("https://le-bloggo.herokuapp.com/article", {
        headers: {
          authorization: `bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((result) => result.json())
        .then((result) => setArticles(result));
    }
  }, [actionWindow]);

  const db = {};

  db.publish = async (e) => {
    const articleId = e.currentTarget.parentNode.id;
    const currentArticle = articles.find(
      (article) => article._id === articleId
    );
    try {
      let res = await fetch(
        `https://le-bloggo.herokuapp.com/article/${articleId}/`,
        {
          method: "PUT",
          body: JSON.stringify({
            published: !currentArticle.published,
          }),
          headers: {
            authorization: `bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        let updatedArticles = [...articles].map((article) => {
          if (article._id === articleId) {
            article.published = !article.published;
            return article;
          } else return article;
        });
        setArticles(updatedArticles);
      }
      if (res.status === 403) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (err) {
      setError(true);
    }
  };

  db.delete = async (e) => {
    const articleId = e.currentTarget.parentNode.id;
    try {
      let res = await fetch(
        `https://le-bloggo.herokuapp.com/article/${articleId}/`,
        {
          method: "DELETE",
          headers: {
            authorization: `bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        const updateArticles = [...articles].filter(
          (article) => article._id !== articleId
        );
        setArticles(updateArticles);
      }
      if (res.status === 403) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (err) {}
  };

  const actionWindowToggle = (action, id) => {
    setActionWindow({
      action: action,
      isOpen: true,
      id: id,
    });
  };

  const actionWindowOff = () => setActionWindow(false);

  return (
    <div id="articleListContainer">
      {error ? <p>An error has occured, please try again</p> : null}
      <div id="articleList">
        {articles
          ? articles.map((article) => (
              <div key={uniqid()} className="article">
                <Link to={article.url}>{article.title}</Link>
                <p>{article.body.slice(0, 50)}...</p>
                <div className="articleActions">
                  <ActionWindow
                    commit={
                      actionWindow.isOpen && actionWindow.id === article._id
                    }
                    name={actionWindow.action}
                    action={db[actionWindow.action]}
                    actionWindowOff={actionWindowOff}
                    actionWindowToggle={actionWindowToggle}
                    article={article}
                  />
                </div>
              </div>
            ))
          : "Loading articles"}
      </div>
    </div>
  );
}
