import axios from "axios";

const getAllArticles = () => {
  return axios
    .get(`https://newscarmen.onrender.com/api/articles`)
    .then((response) => {
       // console.log(response.data)
      return response.data.articles;
    });
};

export default getAllArticles;