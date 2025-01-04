const Auth = () => {
  return (
    <div className="h-screen w-screen">
      <div className="container flex gap-2">
        <p className="text-black">this is auth page</p>
        <a href="/auth/login">
        <button className="border-black border px-4 py-2 rounded-sm">Login</button>
        </a>
        <a href="/auth/register">
        <button className="border-black border  px-4 py-2 rounded-sm">Register</button>
        </a>
      </div>
    </div>
  );
};

export default Auth;
