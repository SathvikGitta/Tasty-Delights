import TrendingCard from "./TrendingCard";
import { HiOutlineArrowTrendingUp } from "react-icons/hi2";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function TrendingPost() {
  const navigate = useNavigate();
  const [trendData, setTrendData] = useState([]);

  // Fetch Data using Axios
  useEffect(() => {
    axios
      .get("http://localhost:3000/trending")
      .then((response) => setTrendData(response.data))
      .catch((err) => console.log(err));
  }, []);

  // Navigate Data
  const handleRecipeClick = (recipeId) => {
    navigate(`/post/${recipeId}`);
  };

  return (
    <>
      <div className="trendingPostContainer">
        <div className="trendingpost-flexicon">
          <HiOutlineArrowTrendingUp size={22} className="icons-trend" />
          <h3 className="trendingpost-heading">Trending </h3>
        </div>

        <div className="data-fetch-container">
          {trendData.slice(0, 7).map((items, key) => {
            return (
              <>
                <div
                  onClick={() => handleRecipeClick(items.id, items.category)}
                  key={key}
                  style={{ cursor: "pointer" }}
                >
                  <TrendingCard
                    userName={items.userName}
                    title={items.title}
                    description={items.postText}
                    category={items.category}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default TrendingPost;
