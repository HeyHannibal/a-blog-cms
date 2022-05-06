import React, { useState, useEffect } from 'react'
import uniqid from 'uniqid';
import { Link } from "react-router-dom";


export default function Homepage(props) {

    const [articles, setArticles] = useState(false)


    useEffect(() => {
        console.log('used effect')
        if(!articles) {fetch('http://localhost:3001/article')
            .then(result => result.json())
            .then(result => setArticles(JSON.parse(result)))
    }})

    function onclc () {
        articles.forEach(item => console.log(item))
    }

    return (
        <div>
            <ul>
               {articles ? articles.map((article) => 
                <li key={uniqid()}><Link to={article.url}>{article.title}</Link></li>
               ) :
                'Loading articles'}
            </ul>
        </div>
    )
}

