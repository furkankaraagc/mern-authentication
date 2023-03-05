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
      <form onSubmit={registerHandler}>
        <h1>Register Page</h1>
        {error && <span>{error}</span>}
        <div>
          <label>
            Email
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
              type='text'
            />
          </label>
          <label>
            Username
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              required
              type='text'
            />
          </label>

          <label>
            Password
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
              type='text'
            />
          </label>
          <label>
            Confirm Password
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              required
              type='text'
            />
          </label>
          <button>Register</button>
        </div>
      </form>
    </div>
  );
};
