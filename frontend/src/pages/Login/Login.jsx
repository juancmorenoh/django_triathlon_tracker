import LoginRegisterForm from "../../components/Forms/Form";

function Login(){
  return(
    <div>
      <LoginRegisterForm route="/api/token/" method='login'/>
    </div>
  )
}

export default Login;