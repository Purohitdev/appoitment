import { UserButton, useUser } from "@clerk/clerk-react"

const Home = () => {
    const {user} = useUser();
  return (
    <div className="h-screen w-screen bg-black text-white">
        <div className="bg-[#f3f3f3] h-screen w-screen text-black flex flex-col justify-center items-center">
          <h1>Protected </h1>
        <p className="text-black">welcomeeeeeeeeeee {user?.username}</p>
        <UserButton/>
      </div>
    </div>
  )
}

export default Home
