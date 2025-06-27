import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UsersPage from "./pages/userPage";
import PostsPage from "./pages/postPage";
import UserDetailPage from "./pages/userDetailPage";

function App() {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Display Details</h1>
        <nav>
          <Link to="/users" style={{ marginRight: "10px" }}>Users</Link>
          <Link to="/posts">Posts</Link>
        </nav>

        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
