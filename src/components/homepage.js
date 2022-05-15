import React, { useState, useEffect } from 'react'
import uniqid from 'uniqid';
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import '../stylesheets/articleList.css'

export default function Homepage(props) {

    const [articles, setArticles] = useState(false)
    const [actionWindow, setActionWindow] = useState({
        isOpen: false,
        id: ''
    })

    let navigate = useNavigate('/')

    useEffect(() => {
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
    }, [actionWindow])

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

    function ActionWindow(props) {
        function completeAction(e) {
            props.func(e);
            props.actionWindowOff();
        }
        console.log(props.func);
        return (
            <div id={props.articleId} className={'completeAction'}>
                <p>{`Click OK to ${props.name}`}</p>
                <button onClick={completeAction}>OK</button>
                <button onClick={props.actionWindowOff}>Go Back</button>
            </div>
        )
    }

    const actionWindowToggle = (e) => {
        setActionWindow({
            action: e.currentTarget.dataset.action,
            isOpen: true,
            id: e.currentTarget.parentNode.id
        })
    }

    const actionWindowOff = () => setActionWindow(false)

    return (
        <div id='articleListContainer'>
            <div id='articleList'>
                {articles ? articles.map((article, index) =>
                    <div key={uniqid()} className='article'><Link to={article.url}>{article.title}</Link>
                        <p>{article.body.slice(0, 50)}...</p>
                        <div className='articleActions' id={article._id}>

                            {actionWindow.isOpen && actionWindow.id === article._id ?
                                <ActionWindow articleId={article._id} name={actionWindow.action} func={db[actionWindow.action]} actionWindowOff={actionWindowOff} />
                                :

                                <div id={article._id} className='actionDiv' >
                                    <button onClick={actionWindowToggle} data-action={'publish'}>{article.published ? 'Unpublish' : 'Publish'}</button>
                                    <DeleteIcon onClick={actionWindowToggle} data-action={'delete'} />
                                </div>

                            }
                        </div>
                    </div>
                ) :
                    'Loading articles'}
            </div>
        </div>
    )
}

