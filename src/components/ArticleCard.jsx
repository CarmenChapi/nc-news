


const ArticleCard = ({article, artIdSelected, setArtIdSelected}) => {
    function handleOnClick(){
        console.log("Go to Article"+ article.article_id)
        //artIdSelected = article.id;
        setArtIdSelected(article.article_id)
        console.log(artIdSelected)
    }
    console.log(article)
    return <li key={article.id}>
        <p className="title-article-card">{article.title}</p>
        <img onClick={handleOnClick} className="photo-article-card" src={article.article_img_url} />
        <div className="footer-article-card"><p>{article.topic} - {article.author}</p><button className="button-article-card" onClick={handleOnClick}>Read more+</button></div>
        </li>
}


export default ArticleCard;
// <p>{article.created_at.split('T')[0]}</p>