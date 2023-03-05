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
    <div>
      <Link to='/'>Home</Link>
      <div className='loginOrRegister'>
        {isLoggedIn ? (
          <p>HELLO</p>
        ) : (
          <div>
            <Link to='/login'>Login Or Register</Link>
          </div>
        )}

        <div className='hoverLogin'>
          {isLoggedIn ? (
            <button onClick={logoutHandler}>Logout</button>
          ) : (
            <div>
              <Link to='/login'>Login</Link>
              <Link to='/register'>Register</Link>
            </div>
          )}
        </div>
      </div>
      <Link to='/private'>private</Link>
    </div>
  );
};
