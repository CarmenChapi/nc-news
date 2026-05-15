import {useState} from "react"
import {patchCommentVotes, deleteComment} from "../utils/api"
import { AiOutlineLike, AiOutlineDislike, AiFillLike, AiFillDislike } from "react-icons/ai";

const CommentCard = ({comment}) => {
    const [votes,setVotes]= useState(comment.votes)
    const [isLiked, setIsLiked] = useState(false)
    const [isDisliked, setIsDisliked] = useState(false)
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
     function handleLikes(){
        setIsErrorCommenting(false)
        if(!isLiked){
            if(isDisliked){
            setVotes(votes + 2);
            setIsDisliked(false);}
            else{
            setVotes(votes + 1)
            }
         
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
        setIsLiked(!isLiked)
    }
    function handleDislikes(){
        setIsErrorCommenting(false)
        if(!isDisliked){
            if(isLiked){
            setVotes(votes - 2)
            setIsLiked(false);
         }
            else{
            setVotes(votes - 1)
            }
          
            patchCommentVotes(comment.comment_id, -1).catch((err)=>{
                setVotes(votes-1)
                setIsErrorCommenting(true)
            })
        }
        else
        {
            setVotes(votes + 1)
            patchCommentVotes(comment.comment_id, 1).catch((err)=>{
                setVotes(votes+1)
                setIsErrorCommenting(true)
            })
        }
        setIsDisliked(!isDisliked)
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
    <p className="comment-body">{comment.body}</p>
    <p>By {comment.author}</p> <p>{date.toUTCString().slice(4,-7)}</p>
    {votes !== 0 ? votes===1 ? <p>{votes} Like</p> 
    :  <p>{votes} Likes</p> 
    : <></>}
    <a className="like-comment2" onClick={handleLikes} aria-label="Like it">{!isLiked ? <AiOutlineLike /> : <AiFillLike />}</a>
     <a className="like-comment2" onClick={handleDislikes} aria-label="Dislike it">{!isDisliked ? <AiOutlineDislike /> : <AiFillDislike />}</a>
    <a className="bin" onClick={handleDelete}>&#128465;</a>
    </section>
}

export default CommentCard