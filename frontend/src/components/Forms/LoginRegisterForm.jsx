// Notes:
//-Might want to use formData instead of handling each input separately

import { useState } from "react";
import api from '../../api';
import { useNavigate} from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";
import { useAuth } from '../../../AuthContext.jsx';

function LoginRegisterForm({route,method}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {isAuthenticated, handleLogin} = useAuth();


  const name = method === "login" ? "Login" : "Register";
  const handleSubmit =  async (e) => {
    setLoading(true);
    e.preventDefault()
    try {
      if (method === 'register' && password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      const res = await api.post(route, {username,password})
      if(method === 'login'){
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
        handleLogin();
        navigate("/workouts")
      }else{
        navigate("/login")
      }
      
    } catch (error) {
      alert(error)
    } finally {
      setLoading (false)
    }
    
  }
  return(
    //form can be improved
    //replace onSubmit with action
    //no need for Onchage each input etc..(check Chef Claude exercise)
    //use FormData and "name=" in input
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name}</h1>
      <input type="text" 
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Username"
      />

      <input type="password" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      />
      {method === "register" && (
        <input type="password" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm Password"
        />
      )}
      <button type="submit" className="form-button">{name}</button>
    </form>
  )
}

export default LoginRegisterForm;