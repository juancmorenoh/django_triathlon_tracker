import axios from "axios";
import { ACCESS_TOKEN } from "./constants";

const api =  axios.create({
  baseURL: import.meta.env.VITE_API_URL
  //  same as baseURL: 'http://127.0.0.1:8000/' when using api
  // you only specify the path, as Baseurl is altready set ,
})

//Now api will automatically attach the token to the header everytime the api is called
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default api;