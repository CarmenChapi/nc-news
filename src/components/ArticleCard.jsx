

import { useNavigate } from "react-router-dom";

import { BiChevronUpCircle } from "react-icons/bi";
import { BiChevronDownCircle } from "react-icons/bi";

import { useState } from "react";

const ArticleCard = ({article}) => {
    const [isSeeMore, setIsSeeMore] = useState(false)
    const navigate = useNavigate();
    function handleOnClick(){
        navigate(`/articles/${article.article_id}`);
    }
    function handleSeeMore(){
        setIsSeeMore(!isSeeMore)
    }
   
    return <section className="article-card">
        <div className="top-card ">

        {(article.title.length < 25) && 
        <div className="top-card">
            <h3 className="title-article-card" onClick={handleOnClick}>{article.title}</h3></div>}
        {(article.title.length >= 25 && !isSeeMore) && 
        <div className="top-card"><h3 className="title-article-card" onClick={handleOnClick}>{article.title.slice(0,20)}...</h3>
        <a className="seeMore" onClick={handleSeeMore}><BiChevronDownCircle fontSize="2em"/></a></div>}
        {(article.title.length >= 25 && isSeeMore) && 
        <div className="top- card"><h3 className="title-article-card" onClick={handleOnClick}>{article.title}</h3>
        <a className="seeMore" onClick={handleSeeMore}><BiChevronUpCircle fontSize="2em"/> </a></div>}

        </div>
        <img onClick={handleOnClick} className="photo-article-card" src={article.article_img_url} tab="mini photo of article"/>
        <div className="footer-article-card">
        <p className="footer-article-card">By {article.author} - {article.topic[0].toUpperCase()+ article.topic.slice(1)}</p>
        </div>
        </section>
}


export default ArticleCard;
