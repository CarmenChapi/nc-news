const sortedByOptions = ["votes", "created_at", "comment_count"]
const sortedByNames = ["Likes", "Date", "Number of comments"]

import { useState } from "react"
import { useNavigate, useLocation} from "react-router-dom";

const SortBy = ({topicByQuery}) => {
  const navigate = useNavigate();
  const [sortedBy, setSortedBy] = useState("")
  const [isDesc, setIsDesc] = useState(true)//Defaul OrdersBy created_at DESC when empty
  const location = useLocation();
  console.log(location.pathname);
  console.log(topicByQuery, '----> topic in SortBy')

  let queryFinal =  location.pathname === '/articles' ?  "?" : '/articles?'
  if(topicByQuery){
    queryFinal += 'topic=' + topicByQuery + '&'
  }
  function handleInputOnChange(e) {
    e.preventDefault()
    setSortedBy(e.target.value);
    console.log(sortedBy)
    
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
      queryFinal += `sorted_by=${sortedBy}`
    }
    if(!isDesc){
        queryFinal += sortedBy ? '&order=asc' : '?order=asc'
      }
    
    console.log(queryFinal)
    navigate(queryFinal);
  }

    return <form>
    <label className="sorted-by">Order Articles by:</label>
    <select name="sorted_by" id="sorted_by" value={sortedBy} onChange={(e)=>handleInputOnChange(e)}>
      {sortedByOptions.map((option, index) => {
       // console.log(option, index, sortedByNames[index])
        return (
          <option value={option} key={index}>
            {sortedByNames[index]}
          </option>
        );
      })}
    </select>
   
    <button  style={{ color: !isDesc ? "black" : "grey" }} onClick={handleAsc}>ASC</button>
    <button  style={{ color: isDesc ? "black" : "grey" }} onClick={handleDesc}>DESC</button> 
    <button onClick={handleClick}>Go</button>
    
    </form>
}

export default SortBy;