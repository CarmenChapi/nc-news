import axios from "axios";


 const  getAllArticles = () => {
  return axios
    .get(`https://newscarmen.onrender.com/api/articles`)
    .then((response) => {
      return response.data.articles;
    }); 
};


export default getAllArticles