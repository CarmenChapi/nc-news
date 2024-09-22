import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage"

const ListArticles = () => {
    const [listArticles, setListArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();
    const topicByQuery = searchParams.get("topic")
    const sortByQuery = searchParams.get("sort_by");
    const orderByQuery = searchParams.get("order");
    const authorByQuery = searchParams.get("author");
    const [error, setError] = useState(null)
    

    useEffect(()=>{
   
        getArticles(topicByQuery,sortByQuery, orderByQuery).then((articles) => {
          if(authorByQuery){
            const array = articles.filter((art) => art.author===authorByQuery)
            setListArticles(array)
          }
          else{
            setListArticles(articles)
          }
            setIsLoading(false)
            })
            .catch(err => {
              console.log('Error getting articles main--->',err)
              setError(err)
              setIsLoading(false)
            })
      },[topicByQuery, sortByQuery, orderByQuery, authorByQuery])

    
      if (isLoading) {
        return <h1 className="loading">...Loading</h1>
      }
    return <div>
      {(error && topicByQuery) && <ErrorPage errorMsg={`Wrong value for topic=${topicByQuery}`}/> }
      {error && <ErrorPage errorMsg={error.message}/>}
    {!error && <div className="listArticles-card">
    {topicByQuery ? <h1>{`List of ${topicByQuery[0].toUpperCase()+topicByQuery.slice(1)} Articles`}</h1> : <h1>List of Articles</h1> } 
    <ul className="listArticles-card">
        {listArticles.map(article => {
           return <li key={article.article_id}><ArticleCard article={article}/> </li>
            })}
    </ul> 
    </div>}
    </div>
}

export default ListArticles;