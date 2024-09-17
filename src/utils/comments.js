import axios from "axios";

const getAllCommentsById = (id) => {
  return axios
    .get(`https://newscarmen.onrender.com/api/articles/${id}/comments`)
    .then((response) => {
        console.log(response.data)
      return response.data.comments;
    });
};

export default getAllCommentsById;