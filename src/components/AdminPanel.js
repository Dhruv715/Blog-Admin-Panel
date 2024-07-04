// AdminPanel.js
import React from "react";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Users from "./Users";
import AddCar from "./AddCar";
import CarList from "./CarList";
import Inquiry from "./Inquiry";
import TestDrive from "./TestDrive";
 
function AdminPanel() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 10 }}>
        <Routes>
          {/* Simple Dashboard */}
          <Route exact path="/" element={<Home />} />
          {/* Add Car */}
          <Route exact path="/addcar" element={<AddCar />} />
          {/* Car Data List Update and Delete */}
          <Route exact path="/cars" element={<CarList />} />
          {/* User Data */}
          <Route exact path="/users" element={<Users />} />
          {/* Inquiry */}
          <Route exact path="/Inquiry" element={<Inquiry />} />
          {/* Test Drive Inquiry */}
          <Route exact path="/testdrive" element={<TestDrive />} />
          
        </Routes>
      </main>
    </>
  );
}

export default AdminPanel;
