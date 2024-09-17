import axios from "axios"; 
 
 const getArticleById = (id) => {
    return axios
      .get(`https://newscarmen.onrender.com/api/articles/${id}`)
      .then((response) => {
        console.log(response.data.article)
        return response.data.article;
      }); 
  }

  export default getArticleById;