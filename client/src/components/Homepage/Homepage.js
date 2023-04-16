import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Homepage() {
  let styles1 = {
    margin: '0px',
    width: '100%',
    backgroundColor: '#fff6f6',
  };
  let styles2 = {
    backgroundColor: '#ffcdb5',
    color: 'black',
    border: 'none',
    size: '28px'
  };
  
  return (
    <div className="Homepage" style={styles1}>
      <div className="Avail_properties" style={styles2}>
        <p styles={styles2}>
          Are you a renter?
        </p>
      </div>
      <div id="Avail_users">
        <p>Are you a landlord?</p>
        <Nav.Link as={Link} to="/renters">
          Search Users & Reviews
        </Nav.Link>
      </div>
    </div>

  )
}

export default Homepage;
