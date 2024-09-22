const sortedByOptions = ["votes", "created_at", "comment_count"]
const sortedByNames = ["Likes", "Date", "Number of comments"]

import { useState } from "react"
import { useNavigate, useLocation} from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const SortBy = () => {
  const navigate = useNavigate();
  const [sortedBy, setSortedBy] = useState("")
  const [isDesc, setIsDesc] = useState(true)//Defaul OrdersBy created_at DESC when empty
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const topicByQuery = searchParams.get("topic")

  let queryFinal =  location.pathname === '/articles' ?  "?" : '/articles?'
  if(topicByQuery){
    queryFinal += 'topic=' + topicByQuery + '&'
  }
  function handleInputOnChange(e) {
    e.preventDefault()
    setSortedBy(e.target.value);    
  }
  function handleAsc(event){
    event.preventDefault()
    setIsDesc(false)
  }
  function handleDesc(event){
    event.preventDefault()
    setIsDesc(true)
  }

  function handleClick(event){
    event.preventDefault()
    if(sortedBy){
      queryFinal += `sort_by=${sortedBy}`
    }
    if(!isDesc){
        queryFinal += sortedBy ? '&order=asc' : '?order=asc'
      }
    
    //console.log(queryFinal)
    navigate(queryFinal);
  }

    return <form className="sort-by">
    <label className="sorted-by-label"><h4>Order Articles by:</h4> </label>
    <select className="article-class input-sortby" name="sorted_by" id="sorted_by" value={sortedBy} onChange={(e)=>handleInputOnChange(e)}>
      {sortedByOptions.map((option, index) => {
        return (
          <option value={option} key={index}>
            {sortedByNames[index]}
          </option>
        );
      })}
    </select>
   
    <button  style={{ background: !isDesc ? "grey" : "white" }} onClick={handleAsc}>Asc &#8593;</button>
    <button  style={{ background: isDesc ? "grey" : "white" }} onClick={handleDesc}>Desc &#8595;</button> 
    <button onClick={handleClick}>Go</button>
    
    </form>
}

export default SortBy;