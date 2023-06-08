import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  postText: Yup.string().required("Post Text is required"),
  category: Yup.string().required("Category is required"),
  image: Yup.mixed().required("Image is required"),
});

function CreatePostPage() {
  const navigate = useNavigate();
  const [postText, setPostText] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const parsedToken = JSON.parse(accessToken);
        const { username } = parsedToken;
        setUsername(username);
      } catch (error) {
        console.error("Error parsing accessToken:", error);
        // Handle the error gracefully, e.g., by clearing the accessToken or showing an error message.
      }
    }
  }, []);

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("image", file);
  };

  const handleInput = (event) => {
    const bullet = "\u2022";
    const { value, selectionStart } = event.target;

    const lines = value.split("\n");
    const currentLineIndex =
      value.substr(0, selectionStart).split("\n").length - 1;
    const currentLine = lines[currentLineIndex];

    if (!currentLine.startsWith(bullet)) {
      lines[currentLineIndex] = `${bullet} ${currentLine}`;
      setPostText(lines.join("\n"));
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("postText", postText);
    formData.append("username", username);
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
              onKeyDown={handleInput}
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            <ErrorMessage name="postText" component="div" />

            <label htmlFor="username">Username:</label>
            <Field
              type="text"
              name="username"
              id="username"
              readOnly
              value={username}
            />
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
