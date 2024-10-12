import axios from "axios"

const token = localStorage.getItem("token")
const api=axios.create({
    baseURL : "http://127.0.0.1:8000/",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
        "Access-Control-Allow-HEADERS": "Content-Type, Authorization",
        Authorization: `Bearer ${token}`,
    },
})




export default api
