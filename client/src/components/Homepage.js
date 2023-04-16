import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Homepage() {
  return (
    <div className="Homepage">
      <div id="Avail_users">
        <Nav.Link as={Link} to="/renters">
          Click Here to See Potential Renters
        </Nav.Link>
      </div>
    </div>
  );
}

export default Homepage;
