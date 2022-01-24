import { Container, Table, Button } from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { UserContext } from "../context/userContext";
import { API } from "../config/api";

import styles from "./styleModule/Admin.module.css";

export default function Admin() {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const handleAdd = () => {
    navigate("/add-user");
  }
  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  }
  const handleDelete = async (id) => {
    await API.delete(`/user/${id}`)
    getUsers()
  }
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await API.get("/users");
      setUsers(response.data.data);
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
    getUsers();
  }, []);

  return (
    <div className={styles.bg}>
      <Container className="d-flex justify-content-center align-content-center">
        <div>
          <Button variant="danger" onClick={logout}>
            Logout
          </Button>
        </div>
        <div className={styles.container}>
          <div className={styles.add}>
            <Button
                className={styles.btnAdd}
                variant="primary"
                onClick={handleAdd}
              >
              Add User
            </Button>
          </div>
          <Table striped bordered hover className={styles.table}>
            <thead>
              <tr>
                <th>No</th>
                <th>User</th>
                <th>Action</th>
              </tr>
            </thead>
            {users.length !== 0 ? (
              <tbody>
                {users?.map((el, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{el.fullName}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleEdit(el.id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(el.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <h1>Data empty</h1>
            )}
          </Table>

        </div>
      </Container>
    </div>
  );
}
