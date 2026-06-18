import { useEffect, useState } from "react";
import { getArticles } from "../utils/api";
import { useSearchParams } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import ErrorPage from "./ErrorPage"
import TopicsNavBar from "./TopicsNavBar"

import SortBy from "./SortBy";

const Home= () => {
    const [listArticles, setListArticles] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [searchParams, setSearchParams] = useSearchParams();
    const topicByQuery = searchParams.get("topic")
    const sortByQuery = searchParams.get("sort_by");
    const orderByQuery = searchParams.get("order");
    const authorByQuery = searchParams.get("author");
    const pageByQuery = Number(searchParams.get("page"));
    const currentPage = Number.isInteger(pageByQuery) && pageByQuery > 0 ? pageByQuery : 1;
    const [error, setError] = useState(null)
    const articlesPerPage = 6;
    

    useEffect(()=>{
      setIsLoading(true)
      setError(null)
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

      const totalPages = Math.ceil(listArticles.length / articlesPerPage);
      const safeCurrentPage = totalPages > 0 ? Math.min(currentPage, totalPages) : 1;

      useEffect(() => {
        if (isLoading || error || currentPage === safeCurrentPage) return;

        const newSearchParams = new URLSearchParams(searchParams);

        if (safeCurrentPage === 1) {
          newSearchParams.delete("page");
        } else {
          newSearchParams.set("page", safeCurrentPage);
        }

        setSearchParams(newSearchParams, { replace: true });
      }, [currentPage, safeCurrentPage, isLoading, error, searchParams, setSearchParams]);

      function updatePage(newPage) {
        const newSearchParams = new URLSearchParams(searchParams);

        if (newPage === 1) {
          newSearchParams.delete("page");
        } else {
          newSearchParams.set("page", newPage);
        }

        setSearchParams(newSearchParams);
        window.scrollTo(0, 0);
      }

    
      if (isLoading) {
        return <div><h1 className="loading">...Loading</h1></div>
      }
      // 2. Lógica matemática para cortar el array
  const indexOfLastArticle = safeCurrentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  
  // Estos son los 6 artículos que se renderizarán en la página actual
  const currentArticles = listArticles.slice(indexOfFirstArticle, indexOfLastArticle);
    return <section className="listArticles-card">
      {(error && topicByQuery) && <ErrorPage errorMsg={`Wrong value for topic=${topicByQuery}`}/> }
      {error && <ErrorPage errorMsg={error.message}/>}
    {!error && 
    <section>
      <div>
      {topicByQuery ? <h1>{`List of ${topicByQuery[0].toUpperCase()+topicByQuery.slice(1)} Articles`}</h1> : <h1>List of Articles</h1> } 
    
          <TopicsNavBar /> 
          <SortBy />
    
    <ul className="listArticles-card">
        {currentArticles.map(article => {
           return <li key={article.article_id}><ArticleCard article={article}/> </li>
            })}
    </ul> 
    {totalPages > 1 && (
              <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
                <button className="login-button"
                  onClick={() => {
                    updatePage(Math.max(safeCurrentPage - 1, 1));
                  }}
                  disabled={safeCurrentPage === 1}
                >
                  Previous
                </button>
                
                <span>
                  View {safeCurrentPage} de {totalPages}
                </span>

                <button className="login-button"
                  onClick={() => {
                    updatePage(Math.min(safeCurrentPage + 1, totalPages));
                  }}
                  disabled={safeCurrentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          
    </div></section>}
    </section>
    
}

export default Home;
