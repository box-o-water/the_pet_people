import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Homepage() {
  return (
    <div
      className="Homepage"
      class="h-96 bg-cyan-600 grid grid-cols-1 p-10 place-items-center"
    >
      <div class="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 p-10">
        <Nav.Link as={Link} to="/renters">
          browse pet-friendly rentals
        </Nav.Link>
      </div>
      <div class="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 p-10">
        <Nav.Link as={Link} to="/renters">
          review our pet-loving renters
        </Nav.Link>
      </div>
    </div>
  );
}

export default Homepage;
