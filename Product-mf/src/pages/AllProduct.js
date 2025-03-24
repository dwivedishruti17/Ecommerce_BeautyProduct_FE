import React, { useEffect, useState } from "react";
import { fetchProducts } from "../api/productApi";
import ProductCard from "../components/ProductCard";
import { FaFilter } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import Filter from "../components/Filter";
import { Row, Col } from "react-bootstrap";

const AllProduct = () => {
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [size] = useState(12);

  const [products, setProducts] = useState([]);
  const [show, setShow] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    name: "",
    order: "asc",
    sortBy: "price",
  });
  const handleNextPage = () => setPage((prev) => prev + 1);
  const handlePrevPage = () => setPage((prev) => Math.max(prev - 1, 0));

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const fetchFilteredProd = async () => {
    const queryParam = new URLSearchParams(location.search);
    console.log("here ");
    const name = queryParam.get("search");
    let requestBody = {};
    if (name) {
      requestBody.name = name;
      console.log("namee:", name);
    }
    if (name) {
      let response = await fetchProducts(requestBody, page, size);
      setProducts(response.content);
    } else {
      const data = await fetchProducts(filters, page, size);
      console.log(data.content);
      setProducts(data.content);
    }
    console.log("response", response);
  };

  useEffect(() => {
    const queryParam = new URLSearchParams(location.search);
    // console.log("here ");
    // const name = queryParam.get("search");

    fetchFilteredProd();
    console.log("location.search", location.search);
    console.log("THIS ONE");
    console.log(page, size, location.search);
  }, [location.search, page, size]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    fetchFilteredProd();
    handleClose();
  };

  return (
    <div className="container">
      <h6>
        <strong>
          <FaFilter onClick={handleShow} /> Filter & Sort
        </strong>
      </h6>

      <Filter
        show={show}
        handleClose={handleClose}
        filters={filters}
        handleFilterChange={handleFilterChange}
        applyFilters={applyFilters}
      />
      {products.length > 0 ? (
        <div>
          <ProductCard products={products} />
          <Row className="mt-3 mb-3">
            <Col className="d-flex justify-content-between">
              <button
                onClick={handlePrevPage}
                disabled={page === 0}
                className="btn-custom rounded py-2 px-3"
              >
                Prev
              </button>
              <button
                onClick={handleNextPage}
                className="btn-custom rounded py-2 px-3"
              >
                Next
              </button>
            </Col>
          </Row>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default AllProduct;
