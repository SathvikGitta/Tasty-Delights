import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Helpers/AuthContext";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  postText: Yup.string().required("Post Text is required"),
  category: Yup.string().required("Category is required"),
  image: Yup.mixed().required("Image is required"),
});

function CreatePostPage() {
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login-page"); // Redirect to login page if user is not logged in
    }
  }, [navigate]);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("image", file);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("postText", values.postText);
    formData.append("category", values.category);
    formData.append("image", values.image);

    try {
      const authToken = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://localhost:3000/recipes",
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      console.log("Post created successfully:", response.data);
      alert("Post created successfully");
      navigate("/recipes");
    } catch (error) {
      console.error("Error creating post:", error);
    }

    setSubmitting(false);
  };

  return (
    <div>
      <h1>Create Post</h1>
      <Formik
        initialValues={{
          title: "",
          postText: "",
          category: "",
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form>
            <label htmlFor="title">Title:</label>
            <Field type="text" name="title" id="title" />
            <ErrorMessage name="title" component="span" />

            <label htmlFor="postText">Post Text:</label>
            <Field
              as="textarea"
              name="postText"
              id="postText"
              rows={10}
              cols={50}
            />
            <ErrorMessage name="postText" component="span" />

            <label htmlFor="category">Category:</label>
            <Field as="select" name="category" id="category">
              <option value="">Select a category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="snacks">Snacks</option>
              <option value="Dinner">Dinner</option>
            </Field>
            <ErrorMessage name="category" component="span" />

            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              accept="image/png,image/jpeg,image/jpg,image/svg"
              onChange={(event) => handleImageChange(event, setFieldValue)}
              name="image"
            />
            <ErrorMessage name="image" component="span" />

            <div>
              <label htmlFor="username">Username:</label>
              <Field
                type="text"
                id="username"
                name="username"
                value={authState.username}
                readOnly
              />
              <ErrorMessage name="username" component="span" />
            </div>

            <div>
              <button
                type="submit"
                style={{
                  width: "120px",
                  marginTop: "20px",
                  height: "40px",
                  backgroundColor: "#232323",
                  color: "#fff",
                  borderRadius: "4px",
                }}
              >
                Create Post
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreatePostPage;
