import { useState } from "react";
import { useParams } from "react-router-dom";
export const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { resetToken } = useParams();

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPassword("");
      setConfirmPassword("");
      return setError("Password doesn't match");
    }
    if (password.length < 6) {
      setPassword("");
      setConfirmPassword("");
      return setError("Passwords must be at least 6 characters");
    }

    try {
      await fetch(
        `http://localhost:5000/api/auth/resetPassword/${resetToken}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
          }),
        }
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((data) => setSuccess(data.data));
    } catch (error) {
      setError("Wrong reset link");
    }
  };

  return (
    <form onSubmit={resetPasswordHandler}>
      {error && <span>{error}</span>}
      {success && <span>{success}</span>}

      <label>
        Password
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
          type='text'
          maxLength={20}
        />
      </label>
      <label>
        Confirm Password
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          value={confirmPassword}
          required
          type='text'
          maxLength={20}
        />
      </label>
      <button>reset password</button>
    </form>
  );
};
