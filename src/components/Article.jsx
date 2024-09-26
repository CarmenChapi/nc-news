import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById, patchArticleVotes } from "../utils/api";
import ErrorPage from "./ErrorPage";
import ListComments from "./ListComments";

const Article = () => {
  //console.log(article);

  const [isLoading, setIsLoading] = useState(true);
  const [articleData, setArticleData] = useState({});
  const { article_id } = useParams();
  const [error, setError] = useState(null);
  const [isVoted, setIsVoted] = useState(false);
 const [date, setDate] = useState(new Date())
  function handleVotesArticle() {
    if (!isVoted) {
      articleData.votes++;
      setArticleData(articleData);
      patchArticleVotes(article_id, 1).catch((err) => {
        articleData.votes--;
        setArticleData(articleData);
        console.log(err);
      });
    } else {
      articleData.votes--;
      setArticleData(articleData);
      patchArticleVotes(article_id, -1).catch((err) => {
        articleData.votes++;
        setArticleData(articleData);
        console.log(err);
      });
    }
    setIsVoted(!isVoted);
  }

  useEffect(() => {
    if (article_id) {
      getArticleById(article_id)
        .then((article) => {
          setArticleData(article);
          const d  = new Date(article.created_at);
          setDate(d.toUTCString().slice(4,-4))
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("Error getting article", article_id, err.message);
          setError(err);
          setIsLoading(false);
        });
    }
  }, []);
  if (isLoading) {
    return <section><h1 className="loading">...Loading</h1></section>;
  }
  return (
    <section className="article-class">
      {error && <ErrorPage errorMsg={`404 Not Found`} />}

      {!error && (
        <section className="article-class">
          <h2>{articleData.title}</h2>
          <img src={articleData.article_img_url} tab="article photograph" />
          <p>By {articleData.author}</p>
          {articleData.votes !== 0 ? (
            articleData.votes === 1 ? (
              <p>{articleData.votes} Like</p>
            ) : (
              <p>{articleData.votes} Likes</p>
            )
          ) : (
            <></>
          )}
          <button className="like-comment" onClick={handleVotesArticle} aria-label="Like it">
            ♥
          </button>
          
          <p>{date}</p>
          <p>
            {articleData.topic[0].toUpperCase() + articleData.topic.slice(1)}-{" "}
            {articleData.body}
          </p>
          <ListComments article_id={article_id} />
        </section>
      )} 
    </section>
  );
};

export default Article;
