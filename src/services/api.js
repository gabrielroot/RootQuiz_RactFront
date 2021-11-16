import axios from 'axios'
require('dotenv/config')

let baseURL
if(
    window.location.hostname === 'localhost' | 
    window.location.hostname === '127.0.0.1' |  
    window.location.hostname === 'quizroot.com'
)
    baseURL = process.env.REACT_APP_BASE_URL_DEV
else
    baseURL = process.env.REACT_APP_BASE_URL

const Api = axios.create({ baseURL, withCredentials: true})
const obj = { Api, baseURL }

export default obj
