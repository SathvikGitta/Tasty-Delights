import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
function RecipePost() {
  const [recipeData, setRecipeData] = useState([]);

  // Fetch Data from Recipes API
  useEffect(() => {
    axios
      .get("http://localhost:3000/recipes")
      .then((response) => setRecipeData(response.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Navbar />
      {recipeData.map((items, key) => {
        return (
          <>
            <Link to="" style={{ color: "#000" }}>
              <div key={key}>
                <RecipeCard
                  userName={items.userName}
                  title={items.title}
                  description={items.postText}
                  category={items.category}
                  image={items.image}
                />
              </div>
            </Link>
          </>
        );
      })}
    </>
  );
}

export default RecipePost;
