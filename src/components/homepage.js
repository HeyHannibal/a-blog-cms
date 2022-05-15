import React, { useState, useEffect } from 'react'
import uniqid from 'uniqid';
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import '../stylesheets/articleList.css'

export default function Homepage(props) {

    const [articles, setArticles] = useState(false)

    let navigate = useNavigate('/')
    
    useEffect(() => {
        console.log('aa');
        if (!localStorage.getItem('token')) {
            navigate('/login')
        }
        if (!articles) {
            fetch('http://localhost:3001/article', {
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(result => result.json())
                .then(result => setArticles(JSON.parse(result)))
        }
    })

    const db = {};

    db.publish = async (e) => {
        const articleId = e.currentTarget.parentNode.id
        const currentArticle = articles.find(article => article._id === articleId)
        try {
            let res = await fetch(`http://localhost:3001/article/${articleId}/`, {
                method: 'PUT',
                body: JSON.stringify({
                    published: !currentArticle.published
                }),
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            if (res.status === 200) {
                let updatedArticles = [...articles].map(article => {
                    if (article._id === articleId) {
                        article.published = !article.published
                        return article
                    } else return article
                })
                setArticles(updatedArticles)
            }
            if (res.status === 403) {
                localStorage.clear()
                navigate('/login')
            }
        } catch (err) {
            console.log(err);
        }
    }


    db.delete = async (e) => {
        const articleId = e.currentTarget.parentNode.id
        try {
            let res = await fetch(`http://localhost:3001/article/${articleId}/`, {
                method: 'DELETE',
                headers: {
                    authorization: `bearer ${localStorage.getItem('token')}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            if (res.status === 200) {
                const updateArticles = [...articles].filter(article => article._id !== articleId)
                setArticles(updateArticles)
            }
            if (res.status === 403) {
                localStorage.clear()
                navigate('/login')
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div id='articleListContainer'>
            <div id='articleList'>
                {articles ? articles.map((article,index) =>
                    <div key={uniqid()} className='article'><Link to={article.url}>{article.title}</Link>
                        <div className='articleActions' id={article._id}>
                            <button id={article._id + '.pub'} onClick={db.publish}>{article.published ? 'Unpublish' : 'Publish'}</button>
                            <DeleteIcon id={article._id + '.del'} onClick={db.delete} />
                            
                        </div>
                    </div>
                ) :
                    'Loading articles'}
            </div>
        </div>
    )
}

