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
        queryFinal += `order=${dirOrderQuery}`
    }
    //console.log('Api getArticles:', queryFinal)
    return ncNews.get(queryFinal).then(({data}) =>{
        return data.articles;
    })
}

export const getArticleById = (id) => {
    return ncNews.get(`/articles/${id}`).then(({data}) =>{
        return data.article;
    // }).catch(err =>{
    //     console.log(err)
       // return err;
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
                    return data.comment
        })
}

export const deleteComment = (id) => {
        return ncNews.delete(`comments/${id}`).then(() =>{
           return "201"
        })
}

export const getAllUsers = () => {
    return ncNews.get(`/users`).then(({data}) =>{
       return data.users
    })
}

export const getAllTopics = () => {
    return ncNews.get(`/topics`).then(({data}) =>{
       return data.topics
    })
}

export const patchArticleVotes = (id, incVts) => {
    const bodyArticle = {"inc_votes" : incVts}
    return ncNews.patch(`/articles/${id}/`, bodyArticle).then(({data}) =>{
        return data.article
    })  
} 