import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { getArticleById, getCommentsById, postComment} from "../utils/api";
import ErrorPage from "./ErrorPage";
import MiniUser from "./MiniUser";


const Article = () => {
    const username = 'grumpy19';
    const [isLoading, setIsLoading] = useState(true)
    const [isPostingComment, setIsPostingComment] = useState(false)
    const [articleData, setArticleData] = useState({})
    const [listComments, setListComments] = useState([])
    const [newCommentValue, setNewCommentValue] = useState("")
    const { article_id } = useParams()
    const [error, setError] = useState(null)
    const [isEmptyError, setIsEmptyError] = useState(null)

    function handleInputOnChange(e){
       setNewCommentValue(e.target.value)
    }
  
    function handleSubmit(e){
        e.preventDefault()
    
        if(newCommentValue){
        setIsEmptyError(false)
        setIsPostingComment(true)
        postComment(article_id, newCommentValue, username).then((comment) => {
            setListComments([comment, ...listComments])
            setNewCommentValue("")
            setIsPostingComment(false)
        })
        .catch((err) => {
        setError(err)
        console.log("Error posting comment--->", err)})
        }else{
            setIsEmptyError(true)
        }
     
    }

    useEffect(() => { 

        if (article_id) {
            getArticleById(article_id).then((article) => {
                setArticleData(article)
                getCommentsById(article_id).then((comments) => {
                    setListComments(comments);
                    setIsLoading(false)
                }).catch((err) => {
                    setError(err)
                    setIsLoading(false)
                    console.log("Error getting comments", article_id,err.message)
                })
            })
                .catch((err) => {
                    console.log("Error getting article",article_id,err.message)
                    setError(err)
                    setIsLoading(false)
                })
        }
    }, [])
    if (isLoading) {
        return <p>...Loading</p>
    }
    return <div>
     { error && <ErrorPage errorMsg={error.message} /> }
     { !error && <div> <MiniUser/> 
        <h1 className="article-class">{articleData.title}</h1>
        <img src={articleData.article_img_url} tab={articleData.title} className="logo" />
        <p className="article-class" >By {articleData.author}</p>
        <p className="article-class" >{articleData.created_at.split('T')[0]}</p>
        <p className="article-class" >{articleData.topic}- {articleData.body}</p>
        {isEmptyError ? <p>Must write text to submit</p> : <></>}
        <input value={newCommentValue} onChange={(e)=>handleInputOnChange(e)} placeholder="Leave a comment" className="article-class input-comment"/><button onClick={handleSubmit}>Submit</button>

        { isPostingComment ? <p>...Posting comment</p> : <></>}
        <h3 className="article-class">Comments</h3>
        <ul key="list-articles">
            {listComments.map(comment => {
                return <CommentCard comment={comment} />
            })}
        </ul>
        </div>
     }
      </div>
}

export default Article;
