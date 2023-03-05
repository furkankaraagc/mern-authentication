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

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <div className='App'>
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
    </BrowserRouter>
  );
}

export default App;
