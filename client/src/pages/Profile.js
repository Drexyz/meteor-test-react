import { Container, Card, Button } from "react-bootstrap";
import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";
import { useParams } from "react-router-dom";

import styles from "./styleModule/Profile.module.css";

export default function Profile() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [profile, setProfile] = useState({});
  const {id} = useParams()

  function handleEdit() {
    navigate(`/edit-profile/${id}`);
  }
  function handleChange() {
    navigate(`/change-password/${id}`);
  }

  // Fetching profile data from database
  const getProfile = async () => {
    try {
      const response = await API.get(`/user/${id}`);
      // Store product data to useState variabel
      setProfile(response.data.data.user);

      console.log(response.data.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    console.log(state);
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className={styles.bg}>
      <Container className="d-flex justify-content-center">
        <Card className={styles.card}>
          <Card.Header as="h5">My Profile</Card.Header>
          <div className="d-flex">
            <Card.Body className={styles.cardBody}>
              <Card.Text>
                <h6>Nama: {profile.fullName}</h6>
                <h6>Email: {profile.email}</h6>
                <h6>Age: {profile.age}</h6>
                <h6>Address: {profile.address}</h6>
              </Card.Text>
              <div className={styles.buttons}>
                <Button
                  variant="primary"
                  onClick={handleEdit}
                  className={styles.btn}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="success"
                  className={styles.btn}
                  onClick={handleChange}
                >
                  Change Password
                </Button>
                <Button variant="danger" onClick={logout}>
                  Logout
                </Button>
              </div>
            </Card.Body>
          </div>
        </Card>
      </Container>
    </div>
  );
}
