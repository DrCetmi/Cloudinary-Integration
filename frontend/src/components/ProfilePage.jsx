import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Table,
  Button,
  Modal,
  Form,
  Image,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const EditUserModal = ({ show, onHide, user, onSave }) => {
  const [editData, setEditData] = useState({ ...user });

  useEffect(() => {
    setEditData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(editData);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={editData.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={editData.email}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ProfilePage = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:4000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:4000/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      toast.info("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user");
    }
  };

  const handleSave = async (userData) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/users/${userData._id}`,
        userData
      );
      setUsers(
        users.map((user) => (user._id === userData._id ? response.data : user))
      );
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user", {
        onClose: () => navigate("/login"),
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out successfully");
    navigate("/login");
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={3} className="bg-dark vh-100">
            <Navbar bg="dark" variant="dark" className="flex-column">
              <Navbar.Brand href="/">LOGO</Navbar.Brand>
              <Nav className="me-auto flex-column">
                <Nav.Link href="#home">Dashboard</Nav.Link>
                <Nav.Link href="#profile">User Profile</Nav.Link>
              </Nav>
            </Navbar>
            <div className="position-absolute bottom-0 left-0 p-2 d-flex flex-column align-items-center justify-content-center">
              <Link to="/">
                <button className="btn btn-warning">Back to Home</button>
              </Link>
              <button className="btn btn-danger mt-2" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </Col>
          <Col md={9} className="mt-5">
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Photo</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Image
                        src={
                          user.profilePicture ||
                          "https://via.placeholder.com/200"
                        }
                        rounded
                        style={{ width: "50px", height: "50px" }}
                      />
                    </td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => handleEdit(user)}
                      >
                        Edit
                      </Button>{" "}
                      <Button
                        variant="danger"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      {editingUser && (
        <EditUserModal
          show={Boolean(editingUser)}
          onHide={() => setEditingUser(null)}
          user={editingUser}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default ProfilePage;
