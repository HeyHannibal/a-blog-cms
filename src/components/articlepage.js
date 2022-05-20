import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import "../stylesheets/articlePage.css";

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(false);
  const [articleId, setArticleId] = useState(id);

  let navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    fetch(`http://localhost:3001/article/${id}/`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((result) => result.json())
      .then((result) => {setArticle(result)});
  }, [articleId]);

  async function deleteComment(e) {
    e.preventDefault();
    try {
      let res = await fetch(
        `http://localhost:3001/article/${id}/comment/${e.currentTarget.parentNode.id}`,
        {
          method: "delete",
          headers: {
            authorization: `bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 200) {
        window.location.reload();
      }
      if (res.status === 403) {
        localStorage.clear();
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {article ? (
        <div id="article">
          <div id="articleContainer">
            <h1>{article.article.title}</h1>
            <p>{article.article.date.split("T")[0]}</p>
            <p>{article.article.body}</p>
          </div>
          {article.comments.map((comment) => (
            <div id={comment._id}>
              <h5>{comment.username}</h5>
              <p>{comment.body}</p>
              <DeleteIcon onClick={deleteComment} />
            </div>
          ))}
        </div>
      ) : (
        "loading article"
      )}
    </div>
  );
}
