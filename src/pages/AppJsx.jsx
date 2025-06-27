import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // fetch users
    axios
      .get("http://localhost:3001/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.log("Error fetching users:", error));

    // fetch posts
    axios
      .get("http://localhost:3001/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.log("Error fetching posts:", error));
  }, []);




  return (
    <div style={{ padding: "20px" }}>
      <h1>Users List (from JSON Server)</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      <h1>Posts List (from JSON Server)</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>: {post.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
