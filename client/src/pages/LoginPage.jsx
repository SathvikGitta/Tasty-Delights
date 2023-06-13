// import axios from "axios";
// import Navbar from "../components/Navbar";
// import { useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../Helpers/AuthContext";

// function LoginPage() {
//   const navigate = useNavigate();

//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const { setAuthState } = useContext(AuthContext);

//   const handleLogin = async () => {
//     const data = { username, password };
//     await axios
//       .post("http://localhost:3000/auth/login", data)
//       .then((response) => {
//         if (response.data.error) {
//           alert(response.data.error);
//         } else {
//           // Accessing authToken
//           alert("your are logged in");
//           navigate("/");
//           localStorage.setItem("authToken", response.data.token);
//           setAuthState({
//             username: response.data.username,
//             id: response.data.id,
//             status: true,
//           });
//         }
//       });
//   };
//   return (
//     <>
//       <Navbar />
//       <section
//         style={{
//           width: "100%",
//           height: "80vh",
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: "10px",
//         }}
//       >
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input
//             type="text"
//             name="username"
//             placeholder="enter your username"
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input
//             type="password"
//             name="password"
//             id=""
//             placeholder="enter your password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         <div>
//           <button
//             type="submit"
//             onClick={handleLogin}
//             style={{
//               marginTop: "10px",
//               width: "90px",
//               backgroundColor: "#232323",
//               color: "#fff",
//               padding: "10px",
//               borderRadius: "20px",
//             }}
//           >
//             Login{" "}
//           </button>
//         </div>
//         <div>
//           <p style={{ fontSize: "14px" }}>
//             Don't have an account?{" "}
//             <button
//               style={{ textDecoration: "underline", color: "blue" }}
//               onClick={() => navigate("/registration-page")}
//             >
//               Register here
//             </button>
//           </p>
//         </div>
//       </section>
//     </>
//   );
// }

// export default LoginPage;

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        values
      );
      if (response.data.error) {
        setServerError(response.data.error);
      } else {
        alert("You are logged in");
        navigate("/");
        localStorage.setItem("authToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setServerError("An error occurred. Please try again.");
    }
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

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
        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form>
            <div>
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                name="username"
                placeholder="Enter your username"
              />
            </div>
            <ErrorMessage
              name="username"
              component="span"
              className="error-message"
            />
            <div>
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </div>
            <ErrorMessage
              name="password"
              component="span"
              className="error-message"
            />
            {serverError && <div className="error-message">{serverError}</div>}
            <div>
              <button
                type="submit"
                style={{
                  marginTop: "10px",
                  width: "90px",
                  backgroundColor: "#232323",
                  color: "#fff",
                  padding: "10px",
                  borderRadius: "20px",
                }}
              >
                Login
              </button>
            </div>
            <div>
              <p style={{ fontSize: "14px", marginTop: "10px" }}>
                Dont have an account?{" "}
                <button
                  style={{ textDecoration: "underline", color: "blue" }}
                  onClick={() => navigate("/registration-page")}
                >
                  Register here
                </button>
              </p>
            </div>
          </Form>
        </Formik>
      </section>
    </>
  );
}

export default LoginPage;
