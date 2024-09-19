import axios from "axios";

const ncNews = axios.create({baseURL: `https://newscarmen.onrender.com/api`})

export const getArticles = (topicQuery, orderByQuery, dirOrderQuery) => {
    let queryFinal = `/articles`
    let isQuery = false;
    if(topicQuery){
        queryFinal += isQuery ? '&' : '?'
        queryFinal += `topic=${topicQuery}`
        isQuery = true
    }
    if(orderByQuery){
        queryFinal += isQuery ? '&' : '?'
        queryFinal += `sort_by=${orderByQuery}`
        isQuery = true
    }
    if(dirOrderQuery){
        queryFinal += isQuery ? '&' : '?'
        queryFinal += `order=${orderdirOrderQueryByQuery}`
    }
    console.log('Api getArticles:', queryFinal)
    return ncNews.get(queryFinal).then(({data}) =>{
        console.log(data.articles)
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
    const bodyComment = {"inc_votes" : incVts}
    return ncNews.patch(`/comments/${id}/`, bodyComment).then(({data}) =>{
        return data.comments
    })
    
} 

export const postComment = (id, body2, username2) => {
    const bodyComment = { username : username2 ,
                          body : body2
                      }
                      console.log(bodyComment, id)
        return ncNews.post(`/articles/${id}/comments`, bodyComment).then(({data}) =>{
                     console.log(data.comment)
                    return data.comment
        })
}

export const deleteComment = (id) => {
        return ncNews.delete(`comments/${id}`).then(() =>{
            console.log("201 delete "+id)
           return "201"
        })
}

export const getAllUser = () => {
    return ncNews.get(`/users`).then(({data}) =>{
        console.log(data.users)
       return data.users
    })
}

export const getAllTopics = () => {
    return ncNews.get(`/topics`).then(({data}) =>{
        console.log(data.topics)
       return data.topics
    })
}