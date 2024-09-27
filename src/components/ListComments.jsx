import CommentCard from "./CommentCard";
import { useEffect, useState } from "react";
import { getCommentsById, postComment} from "../utils/api";
import { useContext } from 'react';
import { UserContext } from "../context/UserContext";


const ListComments = ({article_id}) => {
    const { user, setUser } = useContext(UserContext);
    const username = user.username//'grumpy19';
    const [isLoading, setIsLoading] = useState(true)
    const [isPostingComment, setIsPostingComment] = useState(false)
    const [listComments, setListComments] = useState([])
    const [newCommentValue, setNewCommentValue] = useState("")
    const [error, setError] = useState(null)
    const [isEmptyInputError, setIsInputEmptyError] = useState(null)
    const [isEmptyCommentsList, setIsEmptyCommentsList] = useState(true)
    const [errorPosting, setErrorPosting] = useState(false)

    function handleInputOnChange(e){
        setNewCommentValue(e.target.value)
     }
   
     function handleSubmit(e){
         e.preventDefault()
         setErrorPosting(null)
         if(newCommentValue){
        setIsInputEmptyError(false)
         setIsPostingComment(true)
         postComment(article_id, newCommentValue, username).then((comment) => {
             setListComments([comment, ...listComments])
             setNewCommentValue("")
             setIsPostingComment(false)
             setIsEmptyCommentsList(false)
             setErrorPosting(null)
         })
         .catch((err) => {
         setErrorPosting(err)
         setIsPostingComment(false)
         setIsEmptyCommentsList(false)
         setNewCommentValue("")
         console.log("Error posting comment--->", err.status)})
         }else{
            setIsInputEmptyError(true)
         }
      
     }
     useEffect(() => { 

        if (article_id) {
     
                getCommentsById(article_id).then((comments) => {
                    setListComments(comments);
                    setIsLoading(false)
                    setIsEmptyCommentsList(false)
                }).catch((err) => {
                    console.log(err)
                    setError(err)
                    setIsLoading(false)
                    setIsEmptyCommentsList(true)
                    console.log("Error getting comments", article_id,err.message)
                })
          
        }
    }, [])
     if (isLoading) {
        return <div><h3 className="loading">...Loading comments</h3></div>
    }

    return <section>
        <form label="comment-input">
        <input value={newCommentValue} onChange={(e)=>handleInputOnChange(e)} placeholder="Leave comment" className="article-class input-comment" aria-label="Leave a comment"/><button onClick={handleSubmit}>Submit</button>
        {isEmptyInputError ? <p className="error-input"> Text empty, write text before send comment</p> : <></>}
        </form>
        { isPostingComment ? <h2>...Posting comment</h2> : <></>}
        { errorPosting ? <h2>Error posting comment. Try again</h2> : <></>}
        
        <h3>Comments</h3>
        { isEmptyCommentsList ? <h3>No Comments yet</h3> :
        <ul key="list-articles-card">
            {listComments.map(comment => {
                return  <li key={comment.comment_id} className="comment-card">
                       <CommentCard comment={comment} /></li>
            })}
        </ul>
        }
        </section>
}


export default ListComments;