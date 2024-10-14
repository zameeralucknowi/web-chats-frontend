import axios from 'axios'

const BASE_URL =  "https://web-chats-apis.onrender.com";

const request = axios.create({
    baseURL : BASE_URL
})

export default request;