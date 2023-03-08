import { useEffect } from "react";
import { Link } from "react-router-dom";

export const NavBar = ({ isLoggedIn, setIsLoggedIn }) => {
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsLoggedIn(true);
    }
  });

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
  };

  return (
    <div className='border-b-2 flex justify-between text-lg p-3  '>
      <Link className='hover:text-orange-500 py-2 px-2 ' to='/'>
        Home
      </Link>
      <div className='group cursor-pointer'>
        {isLoggedIn ? (
          <p className='hover:text-orange-500 py-2 px-2 relative'>
            Welcome {localStorage.getItem("username")}
          </p>
        ) : (
          <div className='hover:text-orange-500  py-2 text-center px-2'>
            <Link to='/login'>Login or Register</Link>
          </div>
        )}

        <div className='hoverLogin  '>
          {isLoggedIn ? (
            <div className='shadow-md  rounded bg-gray-50 z-10 hidden group-hover:flex hover:flex flex-col absolute border-solid border border-black py-3 px-7 gap-3'>
              <button
                onClick={logoutHandler}
                className='rounded shadow-md  bg-orange-500  text-white border border-black border-solid py-1 px-4 text-center '
              >
                Logout
              </button>
            </div>
          ) : (
            <div className='shadow-md  rounded bg-gray-50 z-10 hidden group-hover:flex hover:flex flex-col absolute border-solid border border-black py-3 px-7 gap-3'>
              <Link
                className=' rounded shadow-md  bg-orange-500  text-white border border-black border-solid py-1 px-4 text-center'
                to='/login'
              >
                Login
              </Link>
              <Link
                className='rounded shadow-md  bg-orange-500 text-white border border-black border-solid py-1 px-4 text-center'
                to='/register'
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
      <Link className='py-2 hover:text-orange-500 px-2' to='/private '>
        Private Page
      </Link>
    </div>
  );
};
