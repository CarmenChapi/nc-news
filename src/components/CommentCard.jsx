import {useState} from "react"
import {patchCommentVotes, deleteComment} from "../utils/api"

const CommentCard = ({comment}) => {
    const [votes,setVotes]= useState(comment.votes)
    const [isVoted, setIsVoted] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [date, setVote] = useState(new Date(comment.created_at));
    const [isErrorCommenting, setIsErrorCommenting] = useState(false)

    function handleDelete(){
        setIsErrorCommenting(false)
        setIsDeleting(true)
        deleteComment(comment.comment_id)
        setIsDeleted(true)
        setIsDeleting(false)
    }
     function handleVotes(){
        setIsErrorCommenting(false)
        if(!isVoted){
            setVotes(votes + 1)
            patchCommentVotes(comment.comment_id, 1).catch((err)=>{
                setVotes(votes-1)
                setIsErrorCommenting(true)
            })
        }
        else
        {
            setVotes(votes - 1)
            patchCommentVotes(comment.comment_id, -1).catch((err)=>{
                setVotes(votes+1)
                setIsErrorCommenting(true)
            })
        }
        setIsVoted(!isVoted)
    }
    if(isDeleting){
        return <p>...Deleting comment</p>
    }
    if(isDeleted){
        return <></>
    }
    if(isErrorCommenting){
        return <p>Error rating comment. Try again</p>
    }
    return <section>
    <h4>{comment.body}</h4>
    <p>By {comment.author}</p> <p>{date.toUTCString().slice(4,-7)}</p>
    {votes !== 0 ? votes===1 ? <p>{votes} Like</p> 
    :  <p>{votes} Likes</p> 
    : <></>}
    <a className="like-comment" onClick={handleVotes} aria-label="Like it">♥</a>
    <a className="bin" onClick={handleDelete}>&#128465;</a>
    </section>
}

export default CommentCard