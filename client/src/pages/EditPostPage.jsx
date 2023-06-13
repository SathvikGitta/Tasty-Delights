/* eslint-disable react/prop-types */
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditPostPage({ postId }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the post data from the server using the postId
    axios
      .get(`http://localhost:3000/recipes/${postId}`)
      .then((response) => {
        const postData = response.data;
        setTitle(postData.title);
        setPostText(postData.postText);
        setCategory(postData.category);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [postId]);

  const handleUpdatePost = () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("postText", postText);
    formData.append("category", category);
    if (image) {
      formData.append("image", image);
    }

    axios
      .put(`http://localhost:3000/recipes/${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Post updated successfully");
        navigate("/recipes");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Edit Post</h2>
      <form>
        <label>Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Post Text:</label>
        <textarea
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        ></textarea>

        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <label>Image:</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button type="button" onClick={handleUpdatePost}>
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPostPage;
