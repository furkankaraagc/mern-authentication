import { useState } from "react";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/api/auth/forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      })
        .then((res) => {
          if (!res.ok) {
            setError("email. not found");
          } else {
            return res.json();
          }
        })
        .then((data) => setSuccess(data.data));
    } catch (error) {
      setError("email not found");
      setEmail("");
    }
  };

  return (
    <div>
      <h1>Forgot Password Page</h1>
      <form onSubmit={forgotPasswordHandler}>
        {error && <span>{error}</span>}
        {success && <span>{success}</span>}

        <label>
          Email
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type='email'
            placeholder='Email adress'
          />
        </label>
        <button>Continue</button>
      </form>
    </div>
  );
};
