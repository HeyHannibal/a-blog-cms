import React, { useState, useEffect } from 'react'
import uniqid from 'uniqid';
import { Link } from "react-router-dom";
import '../stylesheets/articleList.css'
import DeleteIcon from '@mui/icons-material/Delete';


export default function Homepage(props) {

    const [articles, setArticles] = useState(false)


    useEffect(() => {
        if (!articles) {
            fetch('http://localhost:3001/article')
            .then(result => result.json())
            .then(result => setArticles(JSON.parse(result)))
        }
    })

    const db = {};

    db.delete = async (e) => {
        try {
            let res = await fetch(`http://localhost:3001/cms/article/${e.currentTarget.parentNode.id}/`, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
            if (res.status === 200) {
                window.location.reload()
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div id='articleListContainer'>
            <ul id='articleList'>
                {articles ? articles.map((article) =>
                    <li key={uniqid()} id={article._id}><Link to={article.url}>{article.title}</Link>
                        <DeleteIcon onClick={db.delete} />
                    </li>
                ) :
                    'Loading articles'}
            </ul>
        </div>
    )
}

