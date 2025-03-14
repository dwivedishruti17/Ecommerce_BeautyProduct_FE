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
    // <Row xs={1} md={2} className="g-4">
    //   {subcategories.map((sub) => (
    //     <Col key={sub.id} style={{ width: "200px" }}>
    //       <Card
    //         onClick={() => {
    //           handleCardClick(sub.id);
    //         }}
         
    //       >
    //         <div style={{ width: "175px" }}>
    //           <Card.Img
    //             variant="top"
    //             src={
    //             //   "https://images-static.nykaa.com/media/catalog/product/6/2/622c299NYSWISSB00316_1.jpg"
    //             sub.imageUrl
    //             }
    //           />
    //         </div>
    //         <Card.Body>
    //           <Card.Title>{sub?.name}</Card.Title>
    //           {/* <Card.Text>{"No description available."}</Card.Text> */}
    //         </Card.Body>
    //         <div>
                
    //         </div>
    //       </Card>
         
    //     </Col>
    //   ))}
    // </Row>
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
