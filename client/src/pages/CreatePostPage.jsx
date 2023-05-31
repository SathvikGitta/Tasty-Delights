import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Navbar from "../components/Navbar";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  postText: Yup.string().required("Post Text is required"),
  userName: Yup.string().required("Username is required"),
  category: Yup.string().required("Category is required"),
  image: Yup.mixed().required("Image is required"),
});

function CreatePostPage() {
  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("image", file);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("postText", values.postText);
    formData.append("userName", values.userName);
    formData.append("category", values.category);
    formData.append("image", values.image);

    try {
      await axios.post("http://localhost:3000/recipes", formData);
      console.log("Post created successfully");
      resetForm();
    } catch (error) {
      console.error("Error creating post:", error);
    }

    setSubmitting(false);
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ textAlign: "center" }}>Create Post</h1>
      <Formik
        initialValues={{
          title: "",
          postText: "",
          userName: "",
          category: "",
          image: null,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => (
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
            <label htmlFor="title">Title:</label>
            <Field type="text" name="title" id="title" />
            <ErrorMessage name="title" component="span" className="Error" />

            <label htmlFor="postText">Post Text:</label>
            <Field
              as="textarea"
              name="postText"
              id="postText"
              rows={20}
              cols={30}
            />
            <ErrorMessage name="postText" component="span" className="Error" />

            <label htmlFor="userName">Username:</label>
            <Field type="text" name="userName" id="userName" />
            <ErrorMessage name="userName" component="span" className="Error" />

            <label htmlFor="category">Category:</label>
            <Field as="select" name="category" id="category">
              <option value="">Select a category</option>
              <option value="breakfast">breakfast</option>
              <option value="lunch">lunch</option>
              <option value="dinner">dinner</option>
            </Field>
            <ErrorMessage name="category" component="span" className="Error" />

            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              accept="image/png,image/jpeg,image/jpg,image/svg"
              onChange={(event) => handleImageChange(event, setFieldValue)}
              name="image"
              style={{ display: "inline-block" }}
            />
            <ErrorMessage name="image" component="div" className="Error" />

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                marginTop: "30px",
                padding: "10px 20px",
                backgroundColor: "#232323",
                color: "#fff",
                borderRadius : "8px"
              }}
            >
              Create Post
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreatePostPage;
