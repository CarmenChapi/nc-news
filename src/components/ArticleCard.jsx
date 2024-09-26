

import { useNavigate } from "react-router-dom";

const ArticleCard = ({article}) => {
    const navigate = useNavigate();
    function handleOnClick(){
        navigate(`/articles/${article.article_id}`);
    }
   
    return <section className="article-card">
        <h3 className="title-article-card" onClick={handleOnClick}>{article.title}</h3>
        <img onClick={handleOnClick} className="photo-article-card" src={article.article_img_url} tab="mini photo of article"/>
        <div className="footer-article-card"><p>{article.topic[0].toUpperCase()+ article.topic.slice(1)} - By {article.author}</p><button className="button-article-card" onClick={handleOnClick}>&#x3e;</button></div>
        </section>
}


export default ArticleCard;
