import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";
import MiniUser from "./MiniUser";
import TopicsNavBar from "./TopicsNavBar"
import { useSearchParams } from "react-router-dom";


const Home = () => {
    const [listArticles, setListArticles] = useState([])
    const [artIdSelected, setArtIdSelected] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();

    const topicByQuery = searchParams.get("topic")
    const orderByQuery = searchParams.get("order_by");

    console.log(topicByQuery, orderByQuery)

    useEffect(()=>{
      getArticles(topicByQuery, orderByQuery).then((articles) => {
            setListArticles(articles);
            setIsLoading(false)
          })
          .catch(err => {
            console.log('Error getting articles main--->',err)
          })
    },[topicByQuery])

    if (isLoading) {
        return <p>...Loading</p>
      }
    return <div>
    <MiniUser/> 
    <TopicsNavBar topicByQuery={topicByQuery}/> 
    {topicByQuery ? <h1>{`List of ${topicByQuery} Articles`}</h1> : <h1>List of Articles</h1> } 
    <ul className="listArticles-card">
        {listArticles.map(article => {
           return <ArticleCard article={article} artIdSelected={artIdSelected} setArtIdSelected={setArtIdSelected}/>
            })}
    </ul>
    </div>
}



export default Home;