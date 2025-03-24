import {Navigate} from 'react-router-dom'
import {jwtDecode} from 'jwt-decode'
import api from '../api'
import { REFRESH_TOKEN, ACCESS_TOKEN } from '../constants'
import { useState, useEffect } from 'react'

function ProtectRoute({children}) {
  // State to track if user is authorized or not
  const [isAuthorized, setIsAuthorized] = useState(null)

  // useEffect runs when the component mounts to check if the user is authenticated
  useEffect(()=>{
    auth().catch(()=> setIsAuthorized(false))
  },[])

  const refreshToken = async () => {
    //get the refresh token
    const refreshToken = localStorage.getItem(REFRESH_TOKEN)
    try{
      //send it to the backend
      const res = await api.post("/api/token/refresh/",{
        refresh: refreshToken,
      });
      //if sucessfull you get a new access toke
      //set the new acess token into LocalStorage
      if(res.status === 200){
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        setIsAuthorized(true)
      }else{
        setIsAuthorized(false)
      }
    }catch (error){
      console.error(error)
      setIsAuthorized(false)
    }
  }
  
  // Check if user is authenticated, if not call refreshToken() function to get a new access token
  //if no access token,not authorized
  const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    if(!token) {
      setIsAuthorized(false)
      return
    }
    //decode the token
    const decoded = jwtDecode(token)
    const tokenExpiration = decoded.exp
    const now = Date.now() / 1000 //current time in seconds

    //if the token is expired
    if(tokenExpiration < now){
      //try to get a new one
      await refreshToken()
    }else{
      setIsAuthorized(true)
    }
  }

  //If isAuthorized hasn't load yet display loading...
  if(isAuthorized === null) {
    return <div>Loading....</div>
  }

  // If authorized, render protected children, else redirect to login
  return isAuthorized ? children : <Navigate to='/login' />
}

export default ProtectRoute