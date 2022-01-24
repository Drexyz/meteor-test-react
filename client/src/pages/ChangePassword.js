import { Container, Form, Button, Image } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { API } from "../config/api";

import styles from "./styleModule/EditProfile.module.css";

export default function ChangePassword() {
  let navigate = useNavigate();
  const {id} = useParams();
  // Create Variabel for profile product data here ...
  const [form, setForm] = useState({
    password: "",
  }); 

  // Create function for handle change data on form here ...
  // Handle change data on form
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
      const response = await API.patch(`/password`, body, config);

      console.log(response.data);
      navigate(`/profile/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.bg}>
      <Container className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <h1>Change Password</h1>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={handleChange}
              value={form.password}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Change
          </Button>
        </form>
      </Container>
    </div>
  );
}
