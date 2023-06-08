import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    username: "",
    password: "",
  };
  const handleSubmit = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        formData
      );
      const accessToken = response.data.accessToken; // Get the access token from the response

      // Save the access token to local storage or session storage
      localStorage.setItem("accessToken", accessToken);

      console.log("User logged in successfully");
      alert("You're logged in. Redirecting to the homepage.");
      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <>
      <button
        style={{ height: "50px", marginLeft: "40px" }}
        onClick={() => navigate("/")}
      >
        <BiArrowBack fontSize={28} />
      </button>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form
          style={{
            height: "85vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3 style={{ marginBottom: "30px" }}>Login Page</h3>

          <label htmlFor="username">Username:</label>
          <Field type="text" name="username" id="username" autoComplete="off" />
          <ErrorMessage name="username" component="div" className="Error" />

          <label htmlFor="password">Password:</label>
          <Field type="password" name="password" autoComplete="off" />
          <ErrorMessage name="password" component="div" className="Error" />

          <button
            type="submit"
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              backgroundColor: "#232323",
              color: "#fff",
              borderRadius: "8px",
            }}
          >
            Login
          </button>
          <span style={{ marginTop: "15px", fontSize: 14 }}>
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/registration-page")}
              style={{ textDecoration: "underline", color: "blue" }}
            >
              Register here
            </button>
          </span>

          <button
            onClick={() => navigate("/")}
            style={{ marginTop: "20px", textDecoration: "underline" }}
          >
            Go Home
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default LoginPage;
