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
      <h1 className='text-4xl p-4 mt-10'>Forgot Password Page</h1>
      <form
        className='p-4 flex flex-col gap-3'
        onSubmit={forgotPasswordHandler}
      >
        {error && <span>{error}</span>}
        {success && <span>{success}</span>}

        <label>Email</label>
        <input
          className='border shadow-md border-solid rounded border-black pl-2 py-1'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type='email'
          placeholder='Email adress'
          maxLength={50}
        />
        <button className='rounded shadow-md bg-orange-500 text-white border-solid border-black border p-1 mt-2 hover:opacity-90'>
          Continue
        </button>
      </form>
    </div>
  );
};
