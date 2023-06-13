import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const navigate = useNavigate();
  const intialValues = {
    username: "",
    password: "",
  };

  const ValidationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(15).required(),
  });

  const handleSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3000/auth", data);
      alert("registered succesfully");
      navigate("/login-page");

      //To see the registration works console.log("registerd",data)
    } catch (error) {
      console.error("Error While Registering the user:", error);
    }
  };
  return (
    <>
      <Formik
        initialValues={intialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <h1>Registration Form</h1>
          <div>
            <label>Username:</label>
            <Field
              type="text"
              autoComplete="off"
              name="username"
              id="input_username"
              placeholder="enter your username:"
            />
          </div>
          <ErrorMessage name="username" component="span" />
          <div>
            <label>password:</label>
            <Field
              type="password"
              autoComplete="off"
              name="password"
              id="input_password"
              placeholder="enter your password:"
            />
          </div>
          <ErrorMessage name="password" component="span" />

          <div>
            <button
              type="submit"
              style={{
                marginTop: "10px",
                width: "150px",
                backgroundColor: "#232323",
                color: "#fff",
                padding: "10px",
                borderRadius: "20px",
              }}
            >
              register user
            </button>
          </div>
          <p style={{ fontSize: "14px" }}>
            Have an account
            <button
              onClick={() => navigate("/login-page")}
              style={{
                textDecoration: "underline",
                fontSize: 14,
                color: "blue",
              }}
            >
              login here
            </button>
          </p>
        </Form>
      </Formik>
    </>
  );
}

export default RegistrationPage;
