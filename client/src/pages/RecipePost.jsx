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
    padding: "8px",
    borderRadius: "4px",
    fontSize: 12,
    fontWeight : 400
  };
  return (
    <>
      <Navbar />
      <div
        style={{
          width: "100%",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
          paddingInline: "20px",
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

      {filteredData.map((items, key) => {
        return (
          <div
            key={key}
            onClick={() => handleRecipeClick(items.id, items.category)}
          >
            <RecipeCard
              userName={items.userName}
              title={items.title}
              description={items.postText}
              category={items.category}
              image={items.image}
            />
          </div>
        );
      })}
    </>
  );
}

export default RecipePost;
