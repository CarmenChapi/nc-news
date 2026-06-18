const sortedByOptions = ["votes", "created_at", "comment_count"]
const sortedByNames = ["Likes", "Date", "Number of comments"]

import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const SortBy = () => {
  const navigate = useNavigate();
  const [sortedBy, setSortedBy] = useState("")
  const [isDesc, setIsDesc] = useState(true)//Defaul OrdersBy created_at DESC when empty
  const [searchParams] = useSearchParams();
  const backgroundColor = "var(--color-action)";

  function handleInputOnChange(e) {
    e.preventDefault()
    setSortedBy(e.target.value);    
  }
  function handleAsc(event){
    event.preventDefault()
    setIsDesc(false)
  }
  function handleDesc(event){
    event.preventDefault();
    setIsDesc(true)
  }

  function handleClick(event){
    event.preventDefault()
    const newSearchParams = new URLSearchParams(searchParams);

    if(sortedBy){
      newSearchParams.set("sort_by", sortedBy);
    } else {
      newSearchParams.delete("sort_by");
    }
    if(!isDesc){
      newSearchParams.set("order", "asc");
    } else {
      newSearchParams.delete("order");
    }

    newSearchParams.delete("page");
    const queryString = newSearchParams.toString();
    
    navigate(queryString ? `/articles?${queryString}` : "/articles");
  }

    return <section className="sort-by">
    <form className="sort-by" label="sort-by">
    <h2>Order Articles by:</h2>
    <select aria-label="sort-by" className= "input-sortby" name="sorted_by" id="sorted_by" value={sortedBy} onChange={(e)=>handleInputOnChange(e)}>
      {sortedByOptions.map((option, index) => {
        return (
          <option value={option} key={index} label={`${sortedByNames[index]}`}>
          </option>
        );
      })}
    </select>
   
    <button  style={{ background: !isDesc ? backgroundColor : "var(--color-surface)" }} onClick={handleAsc}>Asc &#8593;</button>
    <button  style={{ background: isDesc ? backgroundColor : "var(--color-surface)" }} onClick={handleDesc}>Desc &#8595;</button> 
    <button onClick={handleClick}>Go</button>
    
    </form>
    </section>
}

export default SortBy;
