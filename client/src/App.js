import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Homepage from "./components/Homepage";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
