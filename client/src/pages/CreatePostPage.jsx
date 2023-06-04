// import { useNavigate } from "react-router-dom";
import CreatePostCard from "./CreatePostCard";

function CreatePostPage() {
  const username = localStorage.getItem("username"); // Get the username from localStorage

  return (
    <div>
      <CreatePostCard username={username} /> {/* Pass the username prop */}
    </div>
  );
}

export default CreatePostPage;
