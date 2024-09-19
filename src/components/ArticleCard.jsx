

import { useNavigate } from "react-router-dom";

const ArticleCard = ({article, artIdSelected, setArtIdSelected}) => {
    const navigate = useNavigate();
    function handleOnClick(){
        setArtIdSelected(article.article_id)
        navigate(`/articles/${artIdSelected}`);
    }
   
    return <li key={article.article_id}>
        <p className="title-article-card" onClick={handleOnClick}>{article.title}</p>
        <img onClick={handleOnClick} className="photo-article-card" src={article.article_img_url} />
        <div className="footer-article-card"><p>{article.topic} - By {article.author}</p><button className="button-article-card" onClick={handleOnClick}>Read more+</button></div>
        </li>
}


export default ArticleCard;
