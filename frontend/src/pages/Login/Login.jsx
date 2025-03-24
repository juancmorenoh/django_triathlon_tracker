import LoginRegisterForm from "../../components/Forms/LoginRegisterForm";

function Login(){
  return(
    <div>
      <LoginRegisterForm route="/api/token/" method='login'/>
    </div>
  )
}

export default Login;