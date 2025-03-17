import LoginRegisterForm from "../../components/Forms/Form";

function Register(){
  return(
    <LoginRegisterForm route='/api/user/register' method='register' />
  )
}

export default Register;