

import { useNavigate } from "react-router-dom";

const ArticleCard = ({article}) => {
    const navigate = useNavigate();
    function handleOnClick(){
        navigate(`/articles/${article.article_id}`);
    }
   
    return <div className="article-card">
        <p className="title-article-card" onClick={handleOnClick}>{article.title}</p>
        <img onClick={handleOnClick} className="photo-article-card" src={article.article_img_url} tab="mini photo of article"/>
        <div className="footer-article-card"><p>{article.topic[0].toUpperCase()+ article.topic.slice(1)} - By {article.author}</p><button className="button-article-card" onClick={handleOnClick}>Read more+</button></div>
        </div>
}


export default ArticleCard;
