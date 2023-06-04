import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function RecipePost() {
  const [recipeData, setRecipeData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  // Fetch Data from Recipes API
  useEffect(() => {
    axios
      .get("http://localhost:3000/recipes")
      .then((response) => setRecipeData(response.data))
      .catch((err) => console.log(err));
  }, []);

  const handleRecipeClick = (recipeId, category) => {
    setSelectedCategory(category);
    navigate(`/post/${recipeId}`);
  };

  const filteredData = selectedCategory
    ? recipeData.filter(
        (item) => item.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : recipeData;

  const buttonStyle = {
    backgroundColor: "#e1e1e1",
    color: "#232323",
    padding: "10px",
    borderRadius: "10px",
    fontSize: 12,
    fontWeight: 400,
  };

  return (
    <>
      <Navbar />
      <div className="recipeContainer-flex">
        <div className="recipeContainer-data">
          {filteredData.map((items, key) => {
            return (
              <div
                key={key}
                onClick={() => handleRecipeClick(items.id, items.category)}
                style={{ cursor: "pointer" }}
              >
                <RecipeCard
                  // username={items.username}
                  title={items.title}
                  description={items.postText}
                  category={items.category}
                  image={items.image}
                />
              </div>
            );
          })}
        </div>

        <div
          className="recipeContainer-category"
          style={{
            width: "100%",
            height: "450px",
            display: "flex",
            alignItems: "start",
            flexWrap: "wrap",
            gap: "14px",
            paddingInline: "20px",
            marginTop: "40px",
          }}
        >
          <button style={buttonStyle} onClick={() => setSelectedCategory(null)}>
            All
          </button>
          <button
            style={buttonStyle}
            onClick={() => setSelectedCategory("breakfast")}
          >
            Breakfast
          </button>
          <button
            style={buttonStyle}
            onClick={() => setSelectedCategory("lunch")}
          >
            Lunch
          </button>
          <button
            style={buttonStyle}
            onClick={() => setSelectedCategory("dinner")}
          >
            Dinner
          </button>
        </div>
      </div>
      {/* End Of Recipe Container */}
    </>
  );
}

export default RecipePost;
