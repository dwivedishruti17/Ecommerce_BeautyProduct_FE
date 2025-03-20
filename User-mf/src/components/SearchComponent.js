// import React, { useState } from 'react';
// import { Button } from 'react-bootstrap';

// const SearchComponent = ({ onSearch }) => {
//     const [searchQuery, setSearchQuery] = useState('');

//     const handleInputChange = (event) => {
//         setSearchQuery(event.target.value);
//     };

//     const handleSearch = (event) => {
//         event.preventDefault();
//         onSearch(searchQuery);
//     };

//     return (
//         <form className="d-flex" onSubmit={handleSearch}>
//             <input
//                 className="form-control me-2"
//                 type="search"
//                 placeholder="Search"
//                 aria-label="Search"
//                 value={searchQuery}
//                 onChange={handleInputChange}
//             />
//             <Button className="btn-custom" type="submit">Search</Button>
//         </form>
//     );
// };

// export default SearchComponent;