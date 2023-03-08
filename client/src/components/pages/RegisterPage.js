import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const RegisterPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      navigate("/");
    }
  }, [navigate]);

  const errorHandler = (data) => {
    if (data.success === false) {
      setError(data.message);
    }
    console.log(data);
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      return setError("password does not match");
    }
    if (password.length < 6) {
      setPassword("");
      setConfirmPassword("");
      return setError("Passwords must be at least 6 characters");
    }

    try {
      await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success === true) {
            localStorage.setItem("authToken", data.token);
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
    <div>
      <form onSubmit={registerHandler} className='flex flex-col mt-10'>
        <p className='text-4xl p-5'>Register</p>
        {error && (
          <span className=' bg-orange-500 text-white rounded p-2 my-3'>
            {error}
          </span>
        )}
        <div className='flex flex-col mt-5 gap-3 p-5'>
          <div className='flex flex-col gap-1 '>
            <label>Email</label>
            <input
              className='border shadow-md  rounded border-solid border-black pl-2 py-1'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              type='email'
              maxLength={50}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label>Username</label>
            <input
              className='rounded shadow-md border border-solid border-black pl-2 py-1'
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              type='text'
              maxLength={20}
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
              placeholder='6+ characters'
              maxLength={20}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <label>Confirm Password</label>
            <input
              className='rounded shadow-md border border-solid border-black pl-2 py-1'
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
              type='password'
              placeholder='6+ characters'
              maxLength={20}
            />
          </div>
          <button className='rounded shadow-md bg-orange-500 text-white border-solid border-black border p-1 mt-2 hover:opacity-90'>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};
