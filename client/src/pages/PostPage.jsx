import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import Navbar from "../components/Navbar";

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

  // Comments Post
  const addComment = () => {
    axios
      .post("http://localhost:3000/comments", {
        commentBody: newComment,
        postId: id,
      })
      .then((response) => {
        // const commentToAdd = { commentBody: newComment };
        setNewComment(response.data);
        setNewComment("");
      });
  };
  return (
    <>
      <Navbar />
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="PostData_Data"
          style={{
            paddingTop: "30px",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: 38, textTransform: "capitalize" }}>
            {postData.title}
          </h2>
          <p style={{ marginTop: "5px", fontSize: 18, fontWeight: 600 }}>
            by {postData.username}
          </p>
          <img
            src={`http://localhost:3000/Images/${postData.image}`}
            alt={postData.image}
            style={{
              marginTop: "20px",
              width: "700px",
              height: "350px",
              objectFit: "cover",
            }}
          />
          <div
            style={{
              marginTop: "10px",
              width: "700px",
              height: "auto",
              textOverflow: "hidden",
              padding: "20px",
              overflow: "hidden",
            }}
          >
            <p style={{ fontSize: 18, fontWeight: 500 }}>Description:</p>
            <div
              style={{
                fontSize: 16,
                marginTop: "10px",
                width: "auto",
                height: "380px",
                lineHeight: "1.5",
                textAlign: "justify",
                maxHeight: "500px",
              }}
            >
              {postData.postText}
            </div>
          </div>
        </div>

        <div className="rightSide" style={{ height: "auto", marginBottom: 30 }}>
          <div className="addCommentContainer">
            <h4 style={{ fontSize: 14, marginBottom: "10px" }}>Comments:</h4>
            <div
              style={{
                padding: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                height: "55px",
                border: "1px solid #e1e1e1",
              }}
            >
              <input
                style={{
                  border: "none",
                  width: "250px",
                  height: "40px",
                }}
                type="text"
                placeholder="thoughts on this recipe?"
                className="input-comments"
                maxLength={32}
                value={newComment}
                onChange={(event) => {
                  setNewComment(event.target.value);
                }}
              />
              <button
                onClick={addComment}
                style={{
                  color: "#232323",
                  padding: "5px 10px",
                }}
              >
                <IoMdSend fontSize={20} color="black" />
              </button>
            </div>
          </div>
          {comments.map((comment, key) => {
            return (
              <div
                key={key}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px",
                  border: "1px solid #232323",
                  marginTop: 5,
                }}
              >
                <span>{comment.commentBody}</span>
                <label style={{ fontSize: 12, fontWeight: 600 }}>
                  username
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PostPage;
