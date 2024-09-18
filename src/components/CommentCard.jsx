import {useState} from "react"
import {patchCommentVotes, deleteComment} from "../utils/api"

const CommentCard = ({comment}) => {
    const [votes,setVotes]= useState(comment.votes)
    const [isVoted, setIsVoted] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    function handleDelete(){
        setIsDeleting(true)
        deleteComment(comment.comment_id)
        setIsDeleted(true)
        setIsDeleting(false)
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
    if(isDeleting){
        return <p>...Deleting comment</p>
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