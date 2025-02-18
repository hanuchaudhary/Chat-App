import axios from "axios";

const customAxios = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL || "http://localhost:3000/api",
    headers: {
        Authorization: localStorage.getItem("token")
    },
});

export default customAxios;