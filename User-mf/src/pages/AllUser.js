import Table from 'react-bootstrap/Table';
import {useEffect, useState} from "react";
import { fetchAllUser, updateRole } from '../api/UserApi';
import { Button } from "react-bootstrap";
import Sidebar from "Cart_Order_mf/Sidebar";

const UserRole = {
  ADMIN: "ADMIN",
  CUSTOMER: "CUSTOMER",
  
}
const AllUser= () => {
   const[alluserData, setAlluserData] = useState([]);

 
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
    <div className='d-flex' >
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
    </div>
  );
}

export default AllUser;