import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { getArticleById, getCommentsById, postComment} from "../utils/api";
import CommentForm from "./CommentForm";

const Article = () => {
    const username = 'grumpy19';
    const [isLoading, setIsLoading] = useState(true)
    const [isPostingComment, setIsPostingComment] = useState(false)
    const [articleData, setArticleData] = useState({})
    const [listComments, setListComments] = useState([])
    const [newCommentValue, setNewCommentValue] = useState("")
    const { article_id } = useParams()

    function handleInputOnChange(e){
       
        setNewCommentValue(e.target.value)
    }
  
    function handleSubmit(e){
        e.preventDefault()
        setIsPostingComment(true)
        console.log(article_id, newCommentValue, username)
        console.log("submit")
        postComment(article_id, newCommentValue, username).then((comment) => {
           // listComments.push(comment)
            setListComments([comment, ...listComments])
            setNewCommentValue("")
            setIsPostingComment(false)
        })
        .catch(err => console.log("Error posting comment--->", err))
     
    }

    useEffect(() => {

        if (article_id) {
            getArticleById(article_id).then((article) => {
                setArticleData(article)
                getCommentsById(article_id).then((comments) => {
                    setListComments(comments);
                    setIsLoading(false)
                }).catch((err) => {
                    console.log(err, "<-----error getting comments")
                })
            })
                .catch((error) => {
                    console.log(error, '<---error getting articleById')
                })
        }
    }, [])
    if (isLoading) {
        return <p>...Loading</p>
    }
    return <div>
        <h1 className="article-class">{articleData.title}</h1>
        <img src={articleData.article_img_url} tab={articleData.title} className="article-photo" />
        <p className="article-class" >By {articleData.author}</p>
        <p className="article-class" >{articleData.created_at.split('T')[0]}</p>
        <p className="article-class" >{articleData.topic}- {articleData.body}</p>

        <input value={newCommentValue} onChange={(e)=>handleInputOnChange(e)} placeholder="Leave a comment" className="article-class input-comment"/><button onClick={handleSubmit}>Submit</button>

        {isPostingComment ? <p>...Posting comment</p> : <></>}
        <h3 className="article-class">Comments</h3>
        <ul>
            {listComments.map(comment => {
                return <CommentCard comment={comment} />
            })}
        </ul>
    </div>

}


export default Article;