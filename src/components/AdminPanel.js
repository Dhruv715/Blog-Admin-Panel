// AdminPanel.js
import React from "react";
import Navbar from "./Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import AllUser from "./AllUser";
import AllBlogs from "./AllBlogs";
import AddBlog from "./AddBlog";
 
function AdminPanel() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 10 }}>
        <Routes>
          {/* Simple Dashboard */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/users" element={<AllUser />} />
          <Route exact path="/blogs" element={<AllBlogs/>} />
          <Route exact path="/addblog" element={<AddBlog/>} />
        </Routes>
      </main>
    </>
  );
}

export default AdminPanel;
