import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/pages/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import { ForgotPasswordPage } from "./components/pages/ForgotPasswordPage";
import { ResetPasswordPage } from "./components/pages/ResetPasswordPage";
import { HomePage } from "./components/pages/HomePage";

import "./components/pages/style.css";
import { PrivatePage } from "./components/pages/PrivatePage";
import { PrivateRoute } from "./components/routing/PrivateRoute";
import { NavBar } from "./components/pages/NavBar";
import { useState } from "react";
import italy from "./images/italy.jpg";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className='bg-white min-h-screen  w-full flex '>
        <div className='md:w-5/12 px-10 py-2 mx-auto'>
          <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path='/private' element={<PrivatePage />} />
            </Route>
            <Route path='/' element={<HomePage />} />
            <Route
              path='/login'
              element={<LoginPage setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path='/register'
              element={<RegisterPage setIsLoggedIn={setIsLoggedIn} />}
            />
            <Route path='/forgotPassword' element={<ForgotPasswordPage />} />
            <Route
              path='/resetPassword/:resetToken'
              element={<ResetPasswordPage />}
            />
          </Routes>
        </div>
        <div className='hidden md:block md:w-8/12  '>
          <img
            className='min-h-screen object-cover object-center'
            src={italy}
            alt=''
          />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
