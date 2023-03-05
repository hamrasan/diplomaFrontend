// import "./App.css";
import TheNavigation from "./components/TheNavigation";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import TheHome from "./views/TheHome";
// import MyProfile from "./views/MyProfile";
import Context from "./appContext";
import AuthRoute from "./AuthRoute";
import React, { useState, useLayoutEffect } from "react";
import Cookies from "js-cookie";
import {Navigate, Routes, Route, useNavigate} from "react-router-dom";
import axios from "axios";
import ErrorComponent from "./components/ErrorComponent";


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [oldUrl, setOldUrl] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

    const login = () => {
    console.log("login name");
    console.log(user);
    axios({
      method: "get",
      url: "http://localhost:8080/user",
      withCredentials: true,
    })
        .then((res) => {
          console.log("res.data");
          console.log(res);
          setUser(res.data);
          setIsAuth(true);
        })
        .catch((error) => {
          logoutFrontEnd();
          console.log("after logout");
          console.error(error);
        });
    // setName(user.firstName);
  };

  useLayoutEffect(() => {
    if (Cookies.get("JSESSIONID") && isAuth == false) {
      login();
    }
  }, isAuth);

  const logout = () => {
    axios({
      method: "post",
      withCredentials: true,
      url: "http://localhost:8080/logout",
      data: {},
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    })
        .then((res) => {
          console.log(res);
          logoutFrontEnd();
        })
        .catch((error) => {
          console.log("after logout");
          console.error(error);
        });
  };

  const logoutFrontEnd = () => {
    Cookies.remove("JSESSIONID");
    setIsAuth(false);
    setUser(null);
  };

  const updateUser = () =>{
    axios({
      method: "get",
      withCredentials: true,
      url: "http://localhost:8080/user",
    })
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          logout();
          console.log("after logout");
          console.error(error);
        });
  }

  const contextValue = {
    isAuth: isAuth,
    login: login,
    logout: logout,
    oldUrl: oldUrl,
    setOldUrl: setOldUrl,
    user: user,
    updateUser: updateUser,
  };

  return (
      <Context.Provider value={contextValue}>
        <div className="App">
          <header className="App-header">
            <TheNavigation user={user} />
          </header>

          <ErrorComponent onReset={() => setError(true)}>
            <div>
                <Routes>
                    <Route path="/login" element={(
                        <AuthRoute guest={true}>
                            <LoginForm/>
                        </AuthRoute>
                    )}/>
                    <Route path="/register" element={(
                        <AuthRoute guest={true}>
                            <RegisterForm/>
                        </AuthRoute>
                    )}/>
                    <Route path="/logout" element={(
                        <AuthRoute guest={false} logout={true}>
                            <Navigate to="/"/>
                        </AuthRoute>
                    )}/>
                    <Route path="/" element={<TheHome />} />
                    <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                    />
                </Routes>
            </div>
          </ErrorComponent>
        </div>
      </Context.Provider>
  );
}

export default App;
