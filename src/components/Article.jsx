import { useState, useEffect } from "react"
import { useParams } from "react-router-dom";
import CommentCard from "./CommentCard";
import { getArticleById, getCommentsById } from "../utils/api";
import CommentForm from "./CommentForm";

const Article = () => {
    const username = 'lurker';
    const [isLoading, setIsLoading] = useState(true)
    const [articleData, setArticleData] = useState({})
    const [listComments, setListComments] = useState([])
    const [newCommentValue, setNewCommentValue] = useState("")
    const { article_id } = useParams()
    console.log(article_id)
    function handleInputOnChange(e){
        console.log(e.target.value)
        setNewCommentValue(e.target.value)
    }
    /*
        body: "What do you see? I have no idea where this will lead us. This place I speak of, is known as the Black Lodge.",
    votes: 16,
    author: "icellusedkars",
    article_id: 5,
    */
    function handleSubmit(e){
        e.preventDefault();
        postComment(id, newCommentValue, username)
        const newComment = {body: newCommentValue,
                            author: username,
                            votes: 0,
                            article_id: article_id,
        }
        listComments.push()
        setNewCommentValue("")
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
    }, [listComments])
    if (isLoading) {
        return <p>...Loading</p>
    }
    return <div>
        <h1 className="article-class">{articleData.title}</h1>
        <img src={articleData.article_img_url} tab={articleData.title} className="article-photo" />
        <p className="article-class" >By {articleData.author}</p>
        <p className="article-class" >{articleData.created_at.split('T')[0]}</p>
        <p className="article-class" >{articleData.topic}- {articleData.body}</p>

        <input onChange={(e)=>handleInputOnChange(e)} placeholder="Leave a comment" className="article-class input-comment"/><button onSubmit={handleSubmit}>Submit</button>


        <h3 className="article-class">Comments</h3>
        <ul>
            {listComments.map(comment => {
                return <CommentCard comment={comment} />
            })}
        </ul>
    </div>

}


export default Article;