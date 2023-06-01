import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const data = { username, password };
    axios
      .post("http://localhost:3000/auth/login", data)
      .then((response) => {
        console.log(response, "Your are Logged In");
        if (response.data.error) {
          alert(response.data.error);
        } else {
          sessionStorage.setItem("accessToken", response.data);
          navigate("/");
        }
        setUsername("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  };

  return (
    <>
      <h1>Login Page</h1>
      <div
        style={{
          width: "100%",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button
          onClick={handleLogin}
          style={{
            background: "#232323",
            color: "#fff",
            padding: "10px 20px",
            marginTop: "20px",
          }}
        >
          Login
        </button>
      </div>
    </>
  );
}

export default LoginPage;
