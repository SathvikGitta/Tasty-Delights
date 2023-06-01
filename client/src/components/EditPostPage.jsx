import EditPostForm from "./EditPostForm";

function EditPostPage() {
  const postId = 123; // Replace with the actual post ID

  return (
    <div>
      <h1>Edit Post</h1>
      <EditPostForm postId={postId} />
    </div>
  );
}

export default EditPostPage;
