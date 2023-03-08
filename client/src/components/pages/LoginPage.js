import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [navigate]);

  const errorHandler = (data) => {
    if (data.success === false) {
      setError(data.message || data.error);
    }
    console.log(data);
  };

  const logingHandler = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            localStorage.setItem("authToken", data.token);
            localStorage.setItem("username", data.username);
            setIsLoggedIn(true);
            navigate("/private");
          } else {
            errorHandler(data);
          }
        });
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={logingHandler} className='  flex flex-col mt-10'>
          <p className='text-4xl p-5 '>Log In</p>
          {error && (
            <span className='border-2 border-red-600  rounded  text-red-600 p-2 ml-4 w-fit my-3'>
              ! {error}
            </span>
          )}
          <div className='flex flex-col mt-5 gap-3 p-5'>
            <div className='flex flex-col gap-1'>
              <label>Email</label>
              <input
                className='border shadow-md border-solid rounded border-black pl-2 py-1 '
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                type='email'
                maxLength={50}
              />
            </div>
            <div className='flex flex-col gap-1'>
              <label>Password</label>
              <input
                className=' rounded shadow-md border border-solid border-black pl-2 py-1'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                type='password'
                maxLength={20}
              />
            </div>

            <button className=' bg-orange-500 rounded shadow-md   text-white border-solid border-black border p-1 mt-2 hover:opacity-90'>
              Login
            </button>
            <Link
              className='mt-4 hover:text-orange-500 w-fit'
              to='/forgotPassword'
            >
              Forgot Password?
            </Link>
            <div>
              Don't have and account?
              <Link className='hover:text-orange-500' to='/register '>
                {" "}
                Register
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
