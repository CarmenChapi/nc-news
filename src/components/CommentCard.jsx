import {useState} from "react"
import {patchCommentVotes, deleteComment} from "../utils/api"

const CommentCard = ({comment}) => {
    const [votes,setVotes]= useState(comment.votes)
    const [isVoted, setIsVoted] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    function handleDelete(){
        console.log("deleteeeeeeeeeeee")
        deleteComment(comment.comment_id)
        setIsDeleted(true)
    }
     function handleVotes(){
        if(!isVoted){
            setVotes(votes + 1)
            patchCommentVotes(comment.comment_id, 1)
        }
        else
        {
            setVotes(votes - 1)
            patchCommentVotes(comment.comment_id, -1)
         
        }
        setIsVoted(!isVoted)
    }
    if(isDeleted){
        return <></>
    }
    return <li key={comment.id} className="comment-card">
        <div>
    <p className="comment-card">{comment.body}</p>
    <p className="comment-card">By {comment.author}</p>
    {votes !== 0 ? votes===1 ? <p className="comment-card">{votes} Like</p> 
    :  <p className="comment-card">{votes} Likes</p> 
    : <></>}
    <button className="like-comment" onClick={handleVotes} aria-label="Like it">♥</button>
    <button onClick={handleDelete}>Delete</button>
    </div>
    </li>
}

export default CommentCard