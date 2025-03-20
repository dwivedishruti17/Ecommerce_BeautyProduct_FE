import React, { useState, useEffect ,Suspense, lazy} from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { fetchProducts } from "../api/productApi";
import { createProduct, updateProduct, deleteProduct } from "../api/productApi";
import { IoTrash } from "react-icons/io5";
import { getAllCategory } from "../api/productApi";
import { getCategoryById } from "../api/productApi";
import { FaEdit } from "react-icons/fa";
import Sidebar from "Cart_Order_mf/Sidebar";
// import ErrorBoundary from "../components/ErrorBoundary";
const ErrorBoundary = lazy(()=>
    import("Cart_Order_mf/Sidebar"));


 
const AllProductTable = () => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const[categories, setCategories] = useState([]);
  const[selectedCat, setSelectedCat] = useState('');
  const[subcategories, setSubcategories] = useState([]);
  const[selectedSubcat, setSelectedSubcat] = useState('');
  const [productData, setProductData] = useState({ name: "", price: "", quantity: "" , description:"", imageUrl:"", subcategoryName:""});
  const [errors, setErrors] = useState({});

    // const [show, setShow] = useState(false);
    const [filters, setFilters] = useState({
        minPrice: "",
        maxPrice: "",
        name: "",
        order: "asc",
        sortBy: "price"
    });

    const validate = () => {
        const newErrors = {};
        if (!productData.name) newErrors.name = 'Name is required';
        // if (!productData.selectedCat) newErrors.selectedCat = 'Category is required';
        // if (!productData.subcategoryName) newErrors.subcategoryName = 'SubCategory is required';
        if (!productData.price) newErrors.price = 'Price is required';
        if (!productData.quantity) newErrors.quantity = 'Quantity is required';
        if (!productData.description) newErrors.description = 'Description is required';
        if (!productData.imageUrl) newErrors.imageUrl = 'Image URL is required';
        return newErrors;
      };
 
    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);
 
    const fetchAllProducts = async () => {
        try {
            const data = await fetchProducts(filters);
            setProducts(data);
        } catch (error) {
            console.log("Cannot fetch products");
        }
    };
 
    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllCategory = async () =>{
        try{
            const data = await getAllCategory();
            setCategories(data);
        }
        catch(error){
            console.log("cannot fetch categories:", error);
        }
    }
    useEffect(()=>{
        fetchAllCategory();
    }, []);

    const handleCategoryChange = async(e) =>{
        const categoryId = parseInt(e.target.value);
    setSelectedCat(categoryId);
    try {
      const selectedCategory = await getCategoryById(categoryId);
      setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
    setSelectedSubcat(''); 
    }

 
    // const handleFilterChange = (e) => {
    //     setFilters({ ...filters, [e.target.name]: e.target.value });
    //         };
         
    //         const applyFilters = () => {
    //             fetchAllProducts();
    //             handleClose();
    //         };
 
  const handleShowModal = (product = { name: "", price: "", quantity: "" ,description:"", imageUrl:"", subcategoryName:"" }) => {
    setProductData(product);
    setShowModal(true);
  };
 
  const handleCloseModal = () => setShowModal(false);
 
  const handleChange = (e) => {
setProductData({ ...productData, [e.target.name]: e.target.value });
if (e.target.name === 'subcategoryName') {
    setSelectedSubcat(e.target.value);
  }
  };
 
  const handleSave = async () => {
    try {
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
        } else{
         if (productData.id) {
    await updateProduct(productData.id, productData);
    fetchAllProducts();
    handleCloseModal();
      } else {
        await createProduct(productData);
        fetchAllProducts();
        handleCloseModal();
      }
    }

      
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async(id)=>{
    try{
        await deleteProduct(id);
        fetchAllProducts();
    }
    catch(error){
        console.error("Cannot delete product");
    }
  }
 
  return (
    <div className="d-flex">
       <ErrorBoundary>
       <Suspense fallback={<div>Loading...</div>}>
            <Sidebar />
          </Suspense>
       </ErrorBoundary>
    
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Product List</h2>
        <Button className="btn-custom" onClick={() => handleShowModal()}>Add New Product</Button>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Description</th>
            {/* <th>Image Url</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
<tr key ={product.id}>
        <td>{product.id}</td>
          <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td>{product.description}</td>
              {/* <td><img src={product.imageUrl}/></td> */}
              <td>
                
                {/* <Button size="sm"> */}
                <FaEdit  onClick={() => handleShowModal(product)} style={{color:"#FF407D"}} />
                {/* </Button> */}
                <span onClick={()=>handleDelete(product.id)}><IoTrash style={{color:"#FF407D", marginLeft:"10px"}}/></span>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
 
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
<Modal.Title>{productData.id ? "Update Product" : "Add Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
value={productData.name}
                onChange={handleChange}
                style={{borderColor:"#FF407D"}}
              />
               {errors.name && <div style={{ color: 'red' }}>{errors.name}</div>}
            </Form.Group>
            <Form.Group>
        <Form.Label>Category</Form.Label>
        <Form.Control as="select" value={selectedCat} onChange={handleCategoryChange}  style={{borderColor:"#FF407D"}}>
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
           

        </Form.Control>
      </Form.Group>
      {/* <Form.Group className="mb-3">
              <Form.Label>SubCategory Name</Form.Label>
              <Form.Control
                type="text"
                name="subcategoryName"
                value={productData.subcategoryName || productData.subcategoryId}
                onChange={handleChange}
                style={{borderColor:"#FF407D"}}
              />
              
            </Form.Group> */}
                <Form.Group>
        <Form.Label>SubCategory</Form.Label>
        <Form.Control as="select" value={productData.subcategoryName} onChange={handleChange} name="subcategoryName"  
        style={{borderColor:"#FF407D"}}
        required>
          {/* <option value="">Select SubCategory</option> */}
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.name}>
              {subcategory.name}
            </option>
             
          ))}
         
        </Form.Control>
      </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                style={{borderColor:"#FF407D"}}
              />
              {errors.price && <div style={{ color: 'red' }}>{errors.price}</div>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="quantity"
                value={productData.quantity}
                onChange={handleChange}
                style={{borderColor:"#FF407D"}}
              />
              {errors.quantity && <div style={{ color: 'red' }}>{errors.quantity}</div>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={productData.description}
                onChange={handleChange}
                style={{borderColor:"#FF407D"}}
              />
               {errors.description && <div style={{ color: 'red' }}>{errors.description}</div>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>ImageUrl</Form.Label>
              <Form.Control
                type="tetxt"
                name="imageUrl"
                value={productData.imageUrl}
                onChange={handleChange}
                style={{borderColor:"#FF407D"}}
              />
               {errors.imageUrl && <div style={{ color: 'red' }}>{errors.imageUrl}</div>}
            </Form.Group>
           

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button className="btn-custom" onClick={handleSave}>{productData.id ? "Update" : "Add"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
    </div>
  );
};
 
export default AllProductTable;