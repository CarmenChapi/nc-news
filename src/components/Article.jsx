import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../utils/api";
import ErrorPage from "./ErrorPage";
import { patchArticleVotes } from "../utils/api";
import ListComments from "./ListComments";

const Article = ({ article }) => {
  console.log(article);

  const [isLoading, setIsLoading] = useState(true);
  const [articleData, setArticleData] = useState({});
  const { article_id } = useParams();
  const [error, setError] = useState(null);
  const [isVoted, setIsVoted] = useState(false);
  console.log(article_id);
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
    return <h1>...Loading</h1>;
  }
  return (
    <div className="article-class">
      {error && <ErrorPage errorMsg={`${error.message}`} />}

      {!error && (
        <div>
          <h1>{articleData.title}</h1>
          <img src={articleData.article_img_url} tab={articleData.title} />
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
          <button className="like-comment" onClick={handleVotesArticle}>
            ♥
          </button>
          <p>{articleData.created_at.split("T")[0]}</p>
          <p>
            {articleData.topic[0].toUpperCase() + articleData.topic.slice(1)}-{" "}
            {articleData.body}
          </p>
          <ListComments article_id={article_id} />
        </div>
      )}
    </div>
  );
};

export default Article;
