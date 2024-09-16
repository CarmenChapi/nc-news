import { useEffect, useState } from "react";
import getAllArticles from "../utils/articles";
import ArticleCard from "./ArticleCard";

const Body = () => {
    const [listArticles, setListArticles] = useState([])
    const [artIdSelected, setArtIdSelected] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    useEffect(()=>{
        getAllArticles().then((articles) => {
           // console.log(articles)
            setListArticles(articles);
            setIsLoading(false)
          });
    }, [])

    if (isLoading) {
        return <p>...Loading</p>
      }
    

    return <div><h1>List of Articles</h1>
    <ul className="listArticles-card">
        {listArticles.map(article => {
           return <ArticleCard article={article} artIdSelected={artIdSelected} setArtIdSelected={setArtIdSelected}/>
        
    
                  
        
            })}
    </ul>
    </div>
}



export default Body;