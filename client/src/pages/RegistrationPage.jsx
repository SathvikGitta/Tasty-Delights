import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username is required and should be at least six characters")
      .min(6),
    password: Yup.string().required("Password is required").min(6).max(20),
  });

  const initialValues = {
    username: "",
    password: "",
  };

  const handleSubmit = async (formData) => {
    try {
      await axios.post("http://localhost:3000/auth", formData);
      console.log("User registered successfully", formData);
    } catch (error) {
      console.error("Error registering a new user:", error);
    }
  };

  return (
    <>
      <button onClick={() => navigate("/")}>back</button>
      <h3>Registration Form</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form
          style={{
            height: "100vh",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label htmlFor="username">Username:</label>
          <Field
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            placeholder="Enter your username"
          />
          <ErrorMessage name="username" component="span" className="Error" />

          <label htmlFor="password">Password:</label>
          <Field
            type="password"
            name="password"
            placeholder="Enter your password"
            autoComplete="false"
          />
          <ErrorMessage name="password" component="span" className="Error" />

          <button
            type="submit"
            style={{
              marginTop: "30px",
              padding: "10px 20px",
              backgroundColor: "#232323",
              color: "#fff",
              borderRadius: "8px",
            }}
          >
            Register
          </button>
        </Form>
      </Formik>
    </>
  );
}

export default RegistrationPage;
