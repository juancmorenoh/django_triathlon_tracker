import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import styles from './Profile.module.css';
import api from "../../api"

function Profile() {
  const [profile,setProfile] = useState(null)

  useEffect(()=>{
    getProfile();
  },[])
  const getProfile = ()=>{
    api
    .get('/users/profile')
    .then((res) => res.data)
    .then((data) => {setProfile(data); console.log(data);})
    .catch((err) => alert(err));
  }

  if (profile === null) {
    return <div>Loading...</div>; 
  }
  
  return (
    <div className={styles.listContainer}>
      <div>
        <h1>Profile</h1>
        <img src={profile.image} alt="user-profile-pic"/>
        <h3>
          Welcome <i>{profile.user.username}</i>
        </h3>
        <p>Email: <i>{profile.user.email}</i></p>
      </div>
      <div>

      </div>
      
    </div>
  )
}

export default Profile
