import React from "react";
import {Form, Button} from "react-bootstrap"
import { Offcanvas } from "react-bootstrap";


const AddAddress = ({handleAddAddress, handleChange}) =>{
    return(
   
        <Form onSubmit={handleAddAddress}>
      <Form.Group controlId="pincode" className="mb-3">
        <Form.Label>Zip</Form.Label>
        <Form.Control type="text" placeholder="Pincode" onChange={handleChange} required />
      </Form.Group>

      <Form.Group controlId="area" className="mb-3">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="Address" onChange={handleChange} required />
      </Form.Group>

      <div className="d-flex gap-2">
        <Form.Group controlId="city" className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" onChange={handleChange} required />
        </Form.Group>

        <Form.Group controlId="state" className="mb-3">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" onChange={handleChange} required />
        </Form.Group>
      </div>

      <Form.Group controlId="phone" className="mb-3">
        <Form.Label>Contact</Form.Label>
        <Form.Control type="text" placeholder="Contact" onChange={handleChange} required />
      </Form.Group>

      <Button type="submit" className="w-100" style={{ backgroundColor: "#FF406D", borderColor: "#FF406D" }}>
        Add Address
      </Button>
    </Form>
    );
}

export default AddAddress;