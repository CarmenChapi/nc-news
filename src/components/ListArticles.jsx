import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage"

const ListArticles = () => {
    const [listArticles, setListArticles] = useState([])
    const [artIdSelected, setArtIdSelected] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();
    const topicByQuery = searchParams.get("topic")
    const sortByQuery = searchParams.get("sort_by");
    const orderByQuery = searchParams.get("order");
    const [error, setError] = useState(null)
    

    useEffect(()=>{
   
        getArticles(topicByQuery,sortByQuery, orderByQuery).then((articles) => {
            setListArticles(articles)
            setIsLoading(false)
            })
            .catch(err => {
              console.log('Error getting articles main--->',err)
              setError(err)
              setIsLoading(false)
            })
      },[topicByQuery, sortByQuery, orderByQuery])

    
      if (isLoading) {
        return <h2>...Loading</h2>
      }
    return <div>
      {(error && topicByQuery) && <ErrorPage errorMsg={`Wrong value for topic=${topicByQuery}`}/> }
      {error && <ErrorPage errorMsg={error.message}/>}
    {!error && <div className="listArticles-card">
    {topicByQuery ? <h1>{`List of ${topicByQuery[0].toUpperCase()+topicByQuery.slice} Articles`}</h1> : <h1>List of Articles</h1> } 
    <ul className="listArticles-card">
        {listArticles.map(article => {
           return <ArticleCard article={article} artIdSelected={artIdSelected} setArtIdSelected={setArtIdSelected}/>
            })}
    </ul> 
    </div>}
    </div>
}

export default ListArticles;