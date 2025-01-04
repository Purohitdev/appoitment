
function Nav() {
  return (
    <div className="h-[8vh] w-full border flex justify-between ">
      <div className="logo">logo</div>
      <ul className="flex gap-2">
        <li>xyz</li>
        <li>xyz</li>
        <li>xyz</li>
        <li>xyz</li>
        <li>xyz</li>
      </ul>

      <div className="flex gap-2">
        <a href="/auth/login">
          <button className="border-black border px-4 py-2 rounded-sm">
            Login
          </button>
        </a>
        <a href="/auth/register">
          <button className="border-black border  px-4 py-2 rounded-sm">
            Register
          </button>
        </a>
      </div>
    </div>
  );
}

export default Nav;
