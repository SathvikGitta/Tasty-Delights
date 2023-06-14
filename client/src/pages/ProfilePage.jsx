import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { BsPen, BsTrash } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [userDetails, setUserDetails] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("authtoken");
        const response = await axios.get(
          "http://localhost:3000/auth/userinfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const token = localStorage.getItem("authtoken");
        const response = await axios.get("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserPosts(response.data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserDetails();
    fetchUserPosts();
  }, []);

  const handleEdit = (postId) => {
    navigate(`/recipes/${postId}`);
  };

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem("authtoken");
      await axios.delete(`http://localhost:3000/recipes/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== postId)
      );
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  if (!userDetails || !userPosts) {
    return (
      <main>
        <div>
          <h1>No User Found!</h1>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div>
        <div>
          <BiUser />
        </div>
        <div>
          <h1>{userDetails.username}</h1>
        </div>
      </div>
      <div>
        {userPosts.map((post) => (
          <div key={post.id}>
            <div>
              <img
                src={`http://localhost:3000/Images/${post.image}`}
                alt="Post Image"
              />
            </div>
            <div>
              <div>
                <h1>{post.title}</h1>
                <p>{post.postText}</p>
              </div>
              <div>
                <button onClick={() => handleEdit(post.id)}>
                  <BsPen />
                </button>
                <button onClick={() => handleDeletePost(post.id)}>
                  <BsTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Profile;
