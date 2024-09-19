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

    const topicByQuery = searchParams.get("topic");
    console.log(topicByQuery)

    useEffect(()=>{
      getArticles(topicByQuery).then((articles) => {
            setListArticles(articles);
            setIsLoading(false)
          })
          .catch(err => {
            console.log('error getting articles main--->',err)
          })
    }, [topicByQuery])

    if (isLoading) {
        return <p>...Loading</p>
      }
    

    return <div>
    <MiniUser/>
    <TopicsNavBar/>
      <h1>List of Articles</h1>
    <ul className="listArticles-card">
        {listArticles.map(article => {
           return <ArticleCard article={article} artIdSelected={artIdSelected} setArtIdSelected={setArtIdSelected}/>
            })}
    </ul>
    </div>
}



export default Home;