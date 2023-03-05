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
        <form onSubmit={logingHandler}>
          <h1>Login Page</h1>
          {error && <span>{error}</span>}
          <div>
            <label>
              Email
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                type='email'
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
            <Link to='/forgotPassword'>Forgot Password</Link>

            <button>login</button>
          </div>
        </form>
      </div>
    </>
  );
};
