import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import "./components.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({products}) =>{
    const navigate = useNavigate();
    const handleCardClick = (productId) => {
        navigate(`/product/productDetail/${productId}`);
      };
    return(
        <Row xs={1} md={2} className="g-4">
      {products.map((prod) => (
        <Col key={prod.id} style={{ width: "250px" }}>
          <Card
            onClick={() => {
              handleCardClick(prod.id);
            }}
         
          >
            <div style={{ width: "200px" }}>
              <Card.Img
                variant="top"
                src={prod.imageUrl}/>
            </div>
            <Card.Body>
              <Card.Title>{prod?.name}</Card.Title>
              <p>MRP:₹{prod?.price}</p>
              {/* <Card.Text>{}</Card.Text> */}
            </Card.Body>
           
            <Button  className="custom-button">Add to cart</Button>
            <div>
                
            </div>
          </Card>
         
        </Col>
      ))}
    </Row>
    )
}

export default ProductCard;