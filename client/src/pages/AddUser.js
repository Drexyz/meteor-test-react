import { Container, Form, Button } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { API, setAuthToken } from "../config/api";

import styles from "./styleModule/AddUser.module.css";

export default function AddRoute() {
  let navigate = useNavigate();

  // Create Variabel for profile product data here ...
  const [form, setForm] = useState({
    email: "",
    fullName: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Create function for handle submit data ...
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      // Insert product data
      const response = await API.post(`/user`, body, config);
      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.bg}>
      <Container className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <h1>Add User</h1>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="input"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              type="input"
              name="fullName"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="input"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add
          </Button>
        </form>
      </Container>
    </div>
  );
}
