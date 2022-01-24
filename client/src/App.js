import { Routes, Route } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import EditProfile from "./pages/EditProfile";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import ChangePassword from "./pages/ChangePassword";

// Init token on axios every time the app is refreshed here ...
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  // Init user context
  const [state, dispatch] = useContext(UserContext);

  //for check user
  const checkUser = async () => {
    try {
      const response = await API.get('/user');

      if (response.status === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      let payload = response.data.data.user;

      payload.token = localStorage.token;

      dispatch({
        type: 'USER_SUCCESS',
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //did mount -> check user
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user/:id" element={<EditUser />} />
        <Route path="/change-password/:id" element={<ChangePassword />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
