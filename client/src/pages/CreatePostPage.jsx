import { Formik, Form, Field } from "formik";
import Navbar from "../components/Navbar";
import axios from "axios";

function CreatePostPage() {
  const initialValues = {
    title: "",
    postText: "",
    userName: "",
    category: "",
    image: "",
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("postText", data.postText);
    formData.append("userName", data.userName);
    formData.append("category", data.category);
    formData.append("image", data.selectedImage);

    axios
      .post("http://localhost:3000/recipes", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => console.log("IT WORKED FOR ME"))
      .catch((error) => console.log(error));
  };

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    setFieldValue("selectedImage", file); // Store the selected file separately
  };

  return (
    <>
      <Navbar />
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ setFieldValue, values }) => (
          <Form encType="multipart/form-data">
            <label htmlFor="title">Recipe Name:</label>
            <Field
              name="title"
              autocompleter="false"
              id="input-title"
              placeholder="Enter your recipe title"
            />
            <label htmlFor="postText">Description</label>
            <Field
              as="textarea"
              name="postText"
              id="input-postText"
              cols="100"
              rows="20"
            />

            <label htmlFor="userName">UserName:</label>
            <Field
              name="userName"
              id="input-userName"
              placeholder="Enter your username"
            />
            <label htmlFor="category">Category:</label>
            <Field
              type="text"
              name="category"
              id="input-category"
              placeholder="Eg:breakfast | Lunch | Dinner"
            />
            <label htmlFor="image">
              upload image:
              <Field
                type="file"
                name="image"
                id="input-image"
                accept="image/png,image/jpeg,image/jpg,image/svg"
                onChange={(event) => handleImageChange(event, setFieldValue)}
              />
              {values.image && <p>Selected image: {values.image.name}</p>}
            </label>
            <input type="submit" value="Create a post" id="input-btn-submit" />
          </Form>
        )}
      </Formik>
    </>
  );
}

export default CreatePostPage;
