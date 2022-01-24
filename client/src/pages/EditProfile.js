import {
  Container,
  Form,
  Card,
  Button,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { API } from "../config/api";

import styles from "./styleModule/EditProfile.module.css";

export default function EditProfile() {
  let navigate = useNavigate();
  const [profile, setProfile] = useState({}); //Profile data
  const {id} = useParams();

  // Create Variabel for profile product data here ...
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    age: "",
    address: "",
  }); //profile data

  // Create function get product data by id from database here ...
  const getProfile = async () => {
    try {
      const response = await API.get(`/user/${id}`);
      // Store product data to useState variabel
      setForm({
        ...form,
        fullName: response.data.data.user.fullName,
        email: response.data.data.user.email,
        age: response.data.data.user.age,
        address: response.data.data.user.address,
      });
      setProfile(response.data.data.user);

      console.log(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

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
      await API.patch(`/user/${id}`, body, config);
      navigate(`/profile/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.bg}>
      <Container className="d-flex justify-content-center">
        <form onSubmit={handleSubmit}>
          <h1>Edit Profile</h1>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>FullName</Form.Label>
            <Form.Control
              type="input"
              placeholder="FullName"
              name="fullName"
              onChange={handleChange}
              value={form.fullName}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="input"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={form.email}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="input"
              name="age"
              placeholder="Age"
              onChange={handleChange}
              value={form.age}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="input"
              placeholder="Address"
              name="address"
              onChange={handleChange}
              value={form.address}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </form>
      </Container>
    </div>
  );
}
