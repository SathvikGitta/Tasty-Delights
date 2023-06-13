import axios from "axios";

function handleDeletePost(postId) {
  axios
    .delete(`http://localhost:3000/recipes/${postId}`)
    .then(() => {
      alert("Post deleted successfully");
    })
    .catch((error) => {
      console.log(error);
    });
}

function DeletePostButton({ postId }) {
  return (
    <button type="button" onClick={() => handleDeletePost(postId)}>
      Delete Post
    </button>
  );
}

export default DeletePostButton;
