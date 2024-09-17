import {useState} from "react"
import {patchCommentVotes} from "../utils/api"

const CommentCard = ({comment}) => {
    const [votes,setVotes]= useState(comment.votes)
    const [isVoted, setIsVoted] = useState(false)
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
   // console.log(comment)
    return <li key={comment.id} className="comment-card">
        <div>
    <p className="comment-card">{comment.body}</p>
    <p className="comment-card">By {comment.author}</p>
    <p className="comment-card">Likes:{votes}</p><button className="like-comment" onClick={handleVotes} aria-label="Like it">♥</button>
    </div>
    </li>
}

export default CommentCard