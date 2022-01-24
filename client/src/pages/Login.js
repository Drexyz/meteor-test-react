import { Container, Form, Button, Alert } from "react-bootstrap";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

import styles from "./styleModule/Login.module.css";
export default function Login() {
  let navigate = useNavigate();

  const [state, dispatch] = useContext(UserContext);

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

  const handleChangeLogin = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // convert form data to string
      const body = JSON.stringify(form);

      //console.log(body);
      // Insert data user to database
      const response = await API.post("/login", body, config);
      

      //console.log(response.data.data);
      if (response.data.data.role_id === 1) {
        navigate("/admin");
      } else if (response.data.data.role_id === 2) {
        navigate(`/profile/${response.data.data.id}`);
      } else {
        navigate("/");
      }
      // navigate("/profile");

      if (response?.status === 200) {
        // Send data to useContext
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
        //console.log(state);

        const alert = (
          <Alert variant="success" className="py-1">
            Login success
          </Alert>
        );
        setMessage(alert);
      }
    } catch (error) {
      const alert = (
        <Alert variant="danger" className="py-1">
          Failed
        </Alert>
      );
      setMessage(alert);

      //console.log(error);
    }
  };
  return (
    <div className={styles.bg}>
      <Container style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
          <div className={styles.form}>
            <form onSubmit={handleLogin}>
              {message && message}
              <h1 className={styles.title}>Login</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  className="input"
                  type="email"
                  placeholder="Email"
                  name="email"
                  onChange={handleChangeLogin}
                  value={email}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  className="input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={handleChangeLogin}
                  value={password}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </form>
          </div>
      </Container>
    </div>
  );
}
