import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";
import MiniUser from "./MiniUser";
import TopicsNavBar from "./TopicsNavBar"
import { useSearchParams } from "react-router-dom";
import ErrorPage from "./ErrorPage";


const Home = () => {
    const [listArticles, setListArticles] = useState([])
    const [artIdSelected, setArtIdSelected] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();

    const topicByQuery = searchParams.get("topic")
    const sortByQuery = searchParams.get("sort_by");
    const orderByQuery = searchParams.get("order");
    const [error, setError] = useState(null)

    console.log(topicByQuery, sortByQuery,orderByQuery)

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
    },[topicByQuery, sortByQuery])

    if (isLoading) {
        return <p>...Loading</p>
      }
    return <div>
      {(error && topicByQuery) && <ErrorPage errorMsg={`Wrong value for topic=${topicByQuery}`}/> }
      {error && <ErrorPage errorMsg={error.message}/>}
    {!error && <div>
    <MiniUser/> 
    <TopicsNavBar topicByQuery={topicByQuery}/> 
    {topicByQuery ? <h1>{`List of ${topicByQuery} Articles`}</h1> : <h1>List of Articles</h1> } 
    <ul className="listArticles-card">
        {listArticles.map(article => {
           return <ArticleCard article={article} artIdSelected={artIdSelected} setArtIdSelected={setArtIdSelected}/>
            })}
    </ul> 
    </div>}
    </div>
}



export default Home;