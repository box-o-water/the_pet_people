import React from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";

function Homepage() {
  return (
    <div className="Homepage h-96 bg-cyan-50 grid grid-cols-1 p-10 place-items-center">
      <Nav.Link
        as={Link}
        to="/renters"
        className="text-center max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 p-10"
      >
        browse our pet-friendly rentals <br /> coming soon!
      </Nav.Link>
      <Nav.Link
        as={Link}
        to="/renters"
        className="max-w-sm rounded overflow-hidden shadow-lg bg-slate-50 p-10"
      >
        review our pet-loving renters
      </Nav.Link>
    </div>
  );
}

export default Homepage;
