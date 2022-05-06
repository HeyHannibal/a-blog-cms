import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PostComment from './postcomment'

export default function ArticlePage() {

    const { id } = useParams()
    const [article, setArticle] = useState(false)
    const [articleId, setArticleId] = useState(id)

    useEffect(() => {
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