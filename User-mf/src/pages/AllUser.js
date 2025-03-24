import Table from 'react-bootstrap/Table';
import {useEffect, useState} from "react";
import { fetchAllUser, updateRole } from '../api/UserApi';
import { Button, Container, Row, Col } from "react-bootstrap";
import Sidebar from "Cart_Order_mf/Sidebar";
import {jwtDecode} from "jwt-decode";

const UserRole = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  
}
const AllUser= () => {
   const[alluserData, setAlluserData] = useState([]);
   const[userRole, setUserRole] = useState('');
 
   useEffect(() => {
    async function AllUserData() {
      try {
        const data = await fetchAllUser(); 
        setAlluserData(data);
      } catch (error) {
        console.error("Failed to load user details", error);
      }
    }
    AllUserData();
  }, []);

  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];

  useEffect(() => {
    if (typeof token === "string") {
      const decodedToken = jwtDecode(token);
      setUserRole(decodedToken.role);
    }
  }, [token]);

  const handleUpdateRole = async(userId) => {
    const result = await updateRole(userId, UserRole.ADMIN);
    
    if(result && result.role===UserRole.ADMIN){
        setAlluserData((prevUsers)=>
        prevUsers.map((user)=>
        user.userId===userId?{...user, role:UserRole.ADMIN}:user));
    }
    else{
        alert("Failed to change the role")
    }
 }
  
  
  console.log("all user :", alluserData);
   
  
  return (

    <div>
      {userRole==='ROLE_ADMIN'?(<div className='d-flex' >
 <Sidebar/>
      <div className='container'>
     
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>User_Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
      {alluserData.length > 0 ? (
          alluserData.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role === 'ADMIN' ? user.role : 
                <Button className='btn-custom' onClick={()=>handleUpdateRole(user.userId)}>Make ADMIN</Button>}</td> 
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">No data available</td>
          </tr>
        )}
       
      </tbody>
    </Table>
    </div>
    </div>):(
       <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
       <Row>
         <Col className="text-center">
            <h1><strong>You aren't allowed to access this Page!!</strong></h1>
           <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQONL8r02qaCFsLNDWI-bUdEo9wcBFZ25ybjw&s" alt="Unauthorized" />
         </Col>
       </Row>
     </Container>
    )}
    </div>
    
  );
}

export default AllUser;