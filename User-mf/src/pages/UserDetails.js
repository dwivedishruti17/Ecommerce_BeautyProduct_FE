import React, {useState, useEffect} from "react";
import { fetchData } from "../api/UserApi";
import { Card, Container, Row, Col, ListGroup, Spinner } from "react-bootstrap";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const UserDetails = () =>{
    const [user, setUser] = useState([]);

    useEffect(() => {
      async function fetchUserData() {
        try {
          const data = await fetchData(); 
          setUser(data);
        } catch (error) {
          console.error("Failed to load user details", error);
        }
      }
      fetchUserData();
    }, []);


    return (
        <div>
        <h2 className="text-center mb-4">My Profile</h2>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-lg">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <FaUser size={40} className="me-3 text-primary" />
         <h4>{user.name}</h4>
              </div>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <FaEnvelope className="me-2 text-success" />
<strong> Email:</strong> {user.email}
                </ListGroup.Item>
                <ListGroup.Item>
                  <FaMapMarkerAlt className="me-2 text-danger" />
                  <strong>Address:</strong>
                  {user.addresses?.length ? (
                    <ul className="list-unstyled mt-2">
                      {user.addresses.map((address) => (
<li key={address.id} className="mb-2">
                          <Card className="p-2 bg-light">
                            <div>
                              <strong>Street:</strong> {address.street}
                            </div>
                            <div>
                              <strong>Area:</strong> {address.area}
                            </div>
                            <div>
            <strong>City:</strong> {address.city}
                            </div>
                            <div>
                              <strong>Pincode:</strong> {address.pincode}
                            </div>
                            <div>
                              {/* <FaPhone className="me-2 text-warning" /> */}
                              <strong>Phone:</strong> {address.phone}
                            </div>
                          </Card>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No address found.</p>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    




    </div>

    );
}

export default UserDetails;