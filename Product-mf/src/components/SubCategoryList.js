import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import "./components.css";

const SubCategoryList = ({ subcategories }) => {
    
  const navigate = useNavigate();
  const handleCardClick = (subcategoryId) => {
    navigate(`/product/products/${subcategoryId}`);
  };
  return (
    <Row xs={2} md={4} className="g-4 justify-content-center">
      {subcategories.map((sub) => (
        <Col key={sub.id} className="d-flex flex-column align-items-center">
          <div
            className="subcategory-item"
            onClick={() => handleCardClick(sub.id)}
          >
            <img src={sub.imageUrl} alt={sub.name} className="subcategory-img" />
            <p className="subcategory-name">{sub.name}</p>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default SubCategoryList;
