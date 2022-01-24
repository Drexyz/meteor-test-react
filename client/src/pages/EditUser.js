import { Container, Form, Button } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { API } from "../config/api";

import styles from "./styleModule/EditUser.module.css";

export default function EditRoute() {
  let navigate = useNavigate();

  const { id } = useParams();

  // Create Variabel for profile product data here ...
  const [form, setForm] = useState({
    email: "",
    fullName: "",
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
      await API.patch(`/user/${id}`, body, config);

      navigate("/admin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.bg}>
      <Container className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <h1>Edit Route</h1>
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

          <Button variant="primary" type="submit">
            Edit
          </Button>
        </form>
      </Container>
    </div>
  );
}
