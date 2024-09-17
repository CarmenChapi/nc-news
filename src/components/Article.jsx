import {useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import getAllCommentsById  from "../utils/comments"
import getArticleById from "../utils/articleById"
import CommentCard from "./CommentCard";

const Article = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [articleData, setArticleData] = useState({})
    const [listComments, setListComments] = useState([])
    const {article_id} = useParams()
    console.log(article_id)
    useEffect(()=>{
        if(article_id){ 
            getArticleById(article_id).then((article) => {
            setArticleData(article)
            getAllCommentsById(article_id).then((comments) => { 
                setListComments(comments);
                setIsLoading(false)
            }).catch((err) => {
                console.log(err, "<-----error getting comments")
         })
        })
        .catch((error)=> {
            console.log(error, '<---error getting articleById')
    })
 }}, [])
 console.log(articleData, listComments)
 if (isLoading) {
    return <p>...Loading</p>
  }
    return <div>
        <h1>{articleData.title}</h1>
        <img src={articleData.article_img_url} tab={articleData.title}/>
        <p>By {articleData.author}</p>
        <p>{articleData.created_at.split('T')[0]}</p>
        <p>{articleData.topic}- {articleData.body}</p>
        <input placeholder="Write a comment"/><button>Send</button>
        <h3>Comments</h3>
         <ul>
            {listComments.map(comment => {
            return <CommentCard comment={comment}/>
            })}
        </ul> 
        </div>
    
}


export default Article;