import React, { useState, useEffect } from "react";
import { fetchData , deleteaddress} from "../api/UserApi";
import {
  Card,
  Container,
  Row,
  Col,
  ListGroup,
  Spinner,
  Button,
} from "react-bootstrap";
import {FaEnvelope, FaMapMarkerAlt} from "react-icons/fa";
import Sidebar from "Cart_Order_mf/Sidebar";
import { addAddress } from "../api/UserApi";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import { FaRegTrashAlt } from "react-icons/fa";
import ErrorBoundary from "../components/ErrorBoundary";

const UserDetails = () => {
  const [user, setUser] = useState([]);
  const [show, setShow] = useState(false);


  const [addressData, setAddressData] = useState({
      state: null,
      area: null,
      city: null,
      pincode: null,
      phone: null,
    });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setAddressData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleAddAddress = async (e) => {
    e.preventDefault();
    try {
     const newaddress = await addAddress(addressData);
     setUser((prevUser)=>({
      ...prevUser, addresses:[...prevUser.addresses, newaddress]
     }))
      console.log("add adresss krooooo");
      setShow(false);
    } catch {
      console.log("error in adding address");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const fetchUserData = async() =>{
    try {
      const data = await fetchData();
      setUser(data);
    } catch (error) {
      console.error("Failed to load user details", error);
    }
  }


  const handleDelete = async (addressId) => {
    try {
      await deleteaddress(addressId);
      setUser((prevUser) => ({
        ...prevUser,
        addresses: prevUser.addresses.filter((addr) => addr.id !== addressId),
      }));
      
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };
  
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
    <div>
      <Modal
        show={show}
        onHide={handleClose}
       
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddAddress}>
            <Form.Group controlId="pincode" className="mb-3">
              <Form.Label>Zip</Form.Label>
              <Form.Control
                type="text"
                placeholder="Pincode"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="area" className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Address"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Form.Group controlId="city" className="mb-3">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="state" className="mb-3">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  onChange={handleChange}
                  required
                />
              </Form.Group>
            </div>

            <Form.Group controlId="phone" className="mb-3">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                placeholder="Contact"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100 button-add-address"
            >
              Add Address
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>

    <div className="d-flex container-full-height">
      <ErrorBoundary>
        <Sidebar />
      </ErrorBoundary>

      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-sm border-0 p-4 card-profile">
              <Card.Body>
                <div className="text-center">
                  <div className="d-inline-flex align-items-center justify-content-center rounded-circle profile-initial-circle">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>

                  <h3 className="mt-3 text-dark">{user.name}</h3>
                  <p className="text-muted">{user.email}</p>
                </div>

                <ListGroup variant="flush" className="mt-4">
                  <ListGroup.Item className="py-3 border-0">
                    <FaEnvelope className="me-2 text-danger" />
                    <strong>Email:</strong> {user.email}
                  </ListGroup.Item>
                  <ListGroup.Item className="py-3 border-0">
                    <FaMapMarkerAlt className="me-2 text-primary" />
                    <strong>Address:</strong>
                    {user.addresses?.length ? (
                      <div>
                        <div>
                          <ul className="list-unstyled mt-3">
                            {user.addresses.map((address) => (
                              <li key={address.id} className="mb-3">
                                <Card className="p-3 shadow-sm border-0 address-item-card">
                                  <div className="d-flex justify-content-between">
                                    <div>
                                      <p className="mb-1">
                                        <strong>{address.area},</strong>
                                      </p>
                                      <p className="mb-1">
                                        {address.city} - {address.pincode}
                                      </p>
                                      <p className="mb-1">
                                        {address.state}, India
                                      </p>
                                      <p className="mb-1">+91-{address.phone}</p>
                                    </div>
                                    <div>
                                      <FaRegTrashAlt onClick={() => handleDelete(address.id)} />
                                    </div>
                                  </div>
                                </Card>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-2 text-muted">No address found.</p>
                    )}
                  </ListGroup.Item>
                </ListGroup>

                <div className="text-center mt-4">
                  <Button
                    variant="outline-danger"
                    className="px-4 py-2 button-outline-add"
                    onClick={handleShow}
                  >
                    Add New Address
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  </div>
  );
};

export default UserDetails;
