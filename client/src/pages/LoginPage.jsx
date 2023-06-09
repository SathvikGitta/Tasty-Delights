import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const data = { username, password };
    await axios.post("http://localhost:3000/auth/login", data).then(() => {
      alert("your are logged in");
      navigate("/");
    });
  };
  return (
    <>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          placeholder="enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id=""
          placeholder="enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit" onClick={handleLogin}>
        Login{" "}
      </button>
    </>
  );
}

export default LoginPage;
