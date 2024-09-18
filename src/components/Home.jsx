import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import ArticleCard from "./ArticleCard";
import MiniUser from "./MiniUser";

const Home = () => {
    const [listArticles, setListArticles] = useState([])
    const [artIdSelected, setArtIdSelected] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{
      getArticles().then((articles) => {
           // console.log(articles)
            setListArticles(articles);
            setIsLoading(false)
          })
          .catch(err => {
            console.log('error getting articles main--->',err)
          })
    }, [])

    if (isLoading) {
        return <p>...Loading</p>
      }
    

    return <div>   <MiniUser/>
      <h1>List of Articles</h1>
    <ul className="listArticles-card">
        {listArticles.map(article => {
           return <ArticleCard article={article} artIdSelected={artIdSelected} setArtIdSelected={setArtIdSelected}/>
            })}
    </ul>
    </div>
}



export default Home;