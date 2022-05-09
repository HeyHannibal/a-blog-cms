import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import PostComment from './postcomment'
import useToken from '../useToken'

export default function ArticlePage() {

    const { token } = useToken()
    const { id } = useParams()
    const [article, setArticle] = useState(false)
    const [articleId, setArticleId] = useState(id)
    let navigate = useNavigate()
    useEffect(() => {
        
        if(!token) {
            navigate('/login')
        }
        
        fetch(`http://localhost:3001/article/${id}/`)
            .then(result => result.json())
            .then(result => setArticle(result))
    }, [articleId])



    return (
        <div>
            {article ?
                <div>
                    <h1>{article.article.title}</h1>
                    <p>{article.article.body}</p>
                    <PostComment articleId={articleId}/>
                    {article.comments.map(comment =>
                        <div>
                            <h5>{comment.username}</h5>
                            <p>{comment.body}</p>
                        </div>
                    )}
                </div>

                : 'loading article'}
        </div>
    )
}