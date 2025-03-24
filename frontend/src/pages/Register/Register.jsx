import LoginRegisterForm from "../../components/Forms/LoginRegisterForm";

function Register(){
  return(
    <LoginRegisterForm route='/users/create/' method='register' />
  )
}

export default Register;