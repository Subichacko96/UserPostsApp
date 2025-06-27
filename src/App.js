import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import UsersPage from "./pages/userPage";
import PostsPage from "./pages/postPage";
import UserDetailPage from "./pages/userDetailPage";
import LoginPage from "./pages/loginPage"; // 👈 import it

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("loggedUser", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>Display Details</h1>
        {user && (
          <>
            <nav>
              <Link to="/users" style={{ marginRight: "10px" }}>Users</Link>
              <Link to="/posts">Posts</Link>
              <button onClick={handleLogout} style={{ marginLeft: "20px" }}>Logout</button>
            </nav>
          </>
        )}

        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/users" /> : <LoginPage onLogin={handleLogin} />
            }
          />
          {user && (
            <>
              <Route path="/users" element={<UsersPage />} />
              <Route path="/posts" element={<PostsPage />} />
              <Route path="/users/:id" element={<UserDetailPage />} />
            </>
          )}
          {/* Fallback for all other routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;




// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import UsersPage from "./pages/userPage";
// import PostsPage from "./pages/postPage";
// import UserDetailPage from "./pages/userDetailPage";

// function App() {
//   return (
//     <Router>
//       <div style={{ padding: "20px" }}>
//         <h1>Display Details</h1>
//         <nav>
//           <Link to="/users" style={{ marginRight: "10px" }}>Users</Link>
//           <Link to="/posts">Posts</Link>
//         </nav>

//         <Routes>
//           <Route path="/users" element={<UsersPage />} />
//           <Route path="/posts" element={<PostsPage />} />
//           <Route path="/users/:id" element={<UserDetailPage />} />

//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
