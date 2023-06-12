import axios from "axios";
import Navbar from "../components/Navbar";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const handleLogin = async () => {
    const data = { username, password };
    await axios
      .post("http://localhost:3000/auth/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          // Accessing authToken
          alert("your are logged in");
          navigate("/");
          localStorage.setItem("authToken", response.data.token);
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  };
  return (
    <>
      <Navbar />
      <section
        style={{
          width: "100%",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
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
        <div>
          <button
            type="submit"
            onClick={handleLogin}
            style={{
              marginTop: "10px",
              width: "90px",
              backgroundColor: "#232323",
              color: "#fff",
              padding: "10px",
              borderRadius: "20px",
            }}
          >
            Login{" "}
          </button>
        </div>
      </section>
    </>
  );
}

export default LoginPage;
