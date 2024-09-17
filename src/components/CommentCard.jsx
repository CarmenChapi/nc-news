import {useState} from "react"

const CommentCard = ({comment}) => {
    const [votes,setVotes]= useState(comment.votes)
    function handleVotes(){
        setVotes(votes + 1)
    }
   // console.log(comment)
    return <li key={comment.id}>
        <div>
    <p>{comment.body}</p>
    <p>By {comment.author}</p>
    <button onClick={handleVotes}>Votes:{votes}</button>
    </div>
    </li>
}

export default CommentCard