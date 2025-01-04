import { SignIn } from "@clerk/clerk-react"

const Login = () => {
  return (
    <div className="bg-[#f3f3f3]">
      <p className=""> this is login page </p>
      <SignIn/>
    </div>
  )
}

export default Login
