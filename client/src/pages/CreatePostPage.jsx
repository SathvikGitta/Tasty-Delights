// import { useNavigate } from "react-router-dom";
import CreatePostCard from "./CreatePostCard";

function CreatePostPage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <CreatePostCard />
    </div>
  );
}

export default CreatePostPage;
