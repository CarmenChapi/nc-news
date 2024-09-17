import axios from "axios";

const ncNews = axios.create({baseURL: `https://newscarmen.onrender.com/api`})

export const getArticles = () => {
    return ncNews.get("/articles").then(({data}) =>{
        return data.articles;
    })
}

export const getArticleById = (id) => {
    return ncNews.get(`/articles/${id}`).then(({data}) =>{
        return data.article;
    })
}

export const getCommentsById = (id) => {
    return ncNews.get(`articles/${id}/comments`).then(({data}) =>{
        return data.comments
    })
} 

export const patchCommentVotes = (id, incVts) => {
    const bodyComment = {inc_votes: incVts}
    return ncNews.patch(`/comments/${id}/`, bodyComment).then(({data}) =>{
        return data.comments
    })
    
} 

export const postComment = (id, body, username) => {
    const bodyComment = {body : body,
                         username : username }
        return ncNews.post(`/api/articles/${id}/comments`, bodyComment).then(({data}) =>{
                            return data.comments
                        })
}

