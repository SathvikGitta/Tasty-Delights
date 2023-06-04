import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values) => {
    axios
      .post("http://localhost:3000/auth/login", values)
      .then((response) => {
        if (response.data.error) {
          setError(response.data.error);
        } else {
          const accessToken = response.data.accessToken;
          localStorage.setItem("accessToken", accessToken);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        setError("An error occurred. Please try again.");
      });
  };

  return (
    <>
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
        <h3 style={{ marginBottom: "30px" }}>Login Page</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                id="username"
                name="username"
                autocomplete="off"
              />
              <ErrorMessage name="username" component="div" />
            </div>

            <div>
              <label htmlFor="password">Password:</label>
              <Field
                type="password"
                id="password"
                name="password"
                autocomplete="off"
              />
              <ErrorMessage name="password" component="div" />
            </div>

            <button
              type="submit"
              style={{
                background: "#232323",
                color: "#fff",
                padding: "10px 20px",
                marginTop: "20px",
              }}
            >
              Login
            </button>
          </Form>
        </Formik>

        <span style={{ marginTop: "15px", fontSize: 14 }}>
          Dont have an account?{" "}
          <button
            onClick={() => navigate("/registration-page")}
            style={{ textDecoration: "underline", color: "blue" }}
          >
            Register here
          </button>
        </span>

        <button
          onClick={() => navigate("/")}
          style={{ textDecoration: "underline", marginTop: "20px" }}
        >
          Go Home
        </button>
      </div>
    </>
  );
}

export default LoginPage;
