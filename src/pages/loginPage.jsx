// LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;


const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios
      //.get(`http://localhost:3001/users?username=${username}&password=${password}`);
      .get(`${apiUrl}/users?username=${username}&password=${password}`);
      if (res.data.length > 0) {
        onLogin(res.data[0]);  // user found
        localStorage.setItem("user", JSON.stringify(username));
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Login error");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
