import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function EditPostForm({ postId }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/recipes/byId/${postId}`
      );
      const post = response.data;
      setTitle(post.title);
      setPostText(post.postText);
      setImage(post.image);
      setCategory(post.category);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("postText", postText);
    formData.append("image", image);
    formData.append("category", category);

    try {
      await axios.put(`http://localhost:3000/recipes/${postId}`, formData);
      console.log("Post updated successfully");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="postText">Post Text:</label>
      <textarea
        id="postText"
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
      ></textarea>

      <label htmlFor="image">Image:</label>
      <input
        type="file"
        id="image"
        accept="image/png,image/jpeg,image/jpg,image/svg"
        onChange={(e) => setImage(e.target.files[0])}
      />

      <label htmlFor="category">Category:</label>
      <select
        id="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select a category</option>
        <option value="breakfast">Breakfast</option>
        <option value="lunch">Lunch</option>
        <option value="dinner">Dinner</option>
      </select>

      <button type="submit">Update Post</button>
    </form>
  );
}

export default EditPostForm;
