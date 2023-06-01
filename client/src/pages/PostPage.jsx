import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PostPage() {
  const [postData, setPostData] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/recipes/${id}`)
      .then((response) => setPostData(response.data))
      .catch((error) => console.log(error));

    axios
      .get(`http://localhost:3000/comments/${id}`)
      .then((response) => setComments(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  const addComment = () => {
    axios
      .post(
        "http://localhost:3000/comments",
        {
          commentBody: newComment,
          postId: id,
        },
        {
          headers: {
            accessToken: sessionStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          const commentToAdd = response.data;
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="leftSide">
        <h1>{postData.title}</h1>
        <h3>{postData.username}</h3>
        <img
          src={`http://localhost:3000/Images/${postData.image}`}
          alt=""
          style={{
            width: "300px",
            height: "450px",
          }}
        />
        <p>{postData.postText}</p>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Leave your comments"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button
            onClick={addComment}
            style={{ background: "skyBlue", color: "#232323", padding: "5px" }}
          >
            Comment It
          </button>
        </div>
        {comments.map((comment, key) => {
          return (
            <div key={key}>
              {comment.commentBody}
              <label>Username: {comment.username}</label>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default PostPage;
