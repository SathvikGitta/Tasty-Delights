import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { IoMdSend, IoIosArrowRoundBack } from "react-icons/io";

import Navbar from "../components/Navbar";

function PostPage() {
  const [postData, setPostData] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const authToken = localStorage.getItem("authToken");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/recipes/${id}`)
      .then((response) => setPostData(response.data))
      .catch((error) => console.log(error));
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/comments/${id}`)
      .then((response) => setComments(response.data))
      .catch((error) => console.log(error));
  });

  // Comments Post
  const addComment = () => {
    axios
      .post(
        "http://localhost:3000/comments",
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => {
        const commentToAdd = {
          commentBody: newComment,
          username: response.data.username,
        };
        setComments([...comments, commentToAdd]);
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
          <div
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <button onClick={() => navigate("/recipes")}>
              <IoIosArrowRoundBack fontSize={55} />
            </button>
            <h2 style={{ fontSize: 38, textTransform: "capitalize" }}>
              {postData.title}
            </h2>
          </div>
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
          <p style={{ marginTop: "10px" }}>Recipe by : {postData.username}</p>

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
                width: "100%",
                height: "auto",
                lineHeight: "1.5",
                textAlign: "justify",
                maxHeight: "500px",
              }}
            >
              {postData.postText}
            </div>
          </div>
        </div>

        {/* *******************COMMENT SECTION ******************************************* */}

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
                <span style={{ color: "black" }}>{comment.commentBody}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: "black" }}>
                  {comment.username}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default PostPage;
