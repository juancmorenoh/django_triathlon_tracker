import LoginForm from "../../components/Forms/LoginForm";

function Login(){
  return(
    <div>
      <LoginForm route="api/token/" />
    </div>
  )
}

export default Login;