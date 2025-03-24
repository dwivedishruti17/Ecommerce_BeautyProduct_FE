import React from 'react';
import { Offcanvas, Form, Button } from 'react-bootstrap';

const Filter = ({ show, handleClose, filters, handleFilterChange, applyFilters }) => {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Filter & Sort</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Min Price</Form.Label>
            <Form.Control type="number" name="minPrice" value={filters.minPrice} onChange={handleFilterChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Max Price</Form.Label>
            <Form.Control type="number" name="maxPrice" value={filters.maxPrice} onChange={handleFilterChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" name="name" value={filters.name} onChange={handleFilterChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Sort By</Form.Label>
            <Form.Select name="sortBy" value={filters.sortBy} onChange={handleFilterChange}>
              <option value="price">Price</option>
              <option value="name">Name</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Order</Form.Label>
            <Form.Select name="order" value={filters.order} onChange={handleFilterChange}>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </Form.Select>
          </Form.Group>

          <button className='btn-custom' onClick={applyFilters}>Apply Filters</button>
        </Form>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Filter;