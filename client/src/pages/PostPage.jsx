import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function PostPage() {
  let [postData, setPostData] = useState({});

  let { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/recipes/byId/${id}`)
      .then((response) => setPostData(response.data));
  }, []);
  return (
    <>
      <h1>{postData.title}</h1>
      <h3>{postData.userName}</h3>
      <img
        src={`http://localhost:3000/Images/${postData.image}`}
        alt=""
        style={{
          width: "300px",
          height: "450px",
        }}
      />
    </>
  );
}

export default PostPage;
