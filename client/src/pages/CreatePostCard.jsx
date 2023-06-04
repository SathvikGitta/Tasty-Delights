import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  postText: Yup.string().required("Post Text is required"),
  username: Yup.string().required("username is required"),
  category: Yup.string().required("Category is required"),
  image: Yup.mixed().required("Image is required"),
});

function CreatePostPage() {
  const navigate = useNavigate();

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("image", file);
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("postText", values.postText);
    formData.append("username", values.username);
    formData.append("category", values.category);
    formData.append("image", values.image);

    try {
      await axios.post("http://localhost:3000/recipes", formData);
      console.log("Post created successfully");
      resetForm();
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
          username: "",
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
            <ErrorMessage name="title" component="div" />

            <label htmlFor="postText">Post Text:</label>
            <Field
              as="textarea"
              name="postText"
              id="postText"
              rows={20}
              cols={50}
              style={{
                resize: "none",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
              }}
            />
            <ErrorMessage name="postText" component="div" />

            <label htmlFor="username">username:</label>
            <Field type="text" name="username" id="username" />
            <ErrorMessage name="username" component="div" />

            <label htmlFor="category">Category:</label>
            <Field as="select" name="category" id="category">
              <option value="">Select a category</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
            </Field>
            <ErrorMessage name="category" component="div" />

            <label htmlFor="image">Image:</label>
            <input
              type="file"
              id="image"
              accept="image/png,image/jpeg,image/jpg,image/svg"
              onChange={(event) => handleImageChange(event, setFieldValue)}
              name="image"
            />
            <ErrorMessage name="image" component="div" />

            <button type="submit">Create Post</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreatePostPage;
