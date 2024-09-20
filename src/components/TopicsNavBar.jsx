import { useEffect, useState } from "react";
import { getAllTopics } from "../utils/api";
import { Link } from "react-router-dom";
import SortBy from "./SortBy.jsx";

const TopicsNavBar = ({topicByQuery}) => {
    const [listTopics, setListTopics] = useState([])
    useEffect(() => {
        getAllTopics().then(topics => {
            setListTopics(topics)
        })
        .catch(err => {
            console.log("Error getting topics--->", err)
        })
    },[])
   
    return <div className="topic-nav-bar">
        <SortBy topicByQuery={topicByQuery}/>
        {
            listTopics.map((topic, index) => {
              
               return  <Link key={index} className="nav-links" to={`/articles?topic=${topic.slug}`}>
               {topic.slug.toUpperCase()} { }
             </Link>
            })
        }
       
    </div>
}

export default TopicsNavBar; 